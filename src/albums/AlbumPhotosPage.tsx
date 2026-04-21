import { useEffect, useState, type FormEvent, type SyntheticEvent } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { db } from "../util/firebase";
import type { Photo } from "../model";

const AlbumPhotosPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albumName, setAlbumName] = useState("");
  const [albumMissing, setAlbumMissing] = useState(false);
  const [albumLoading, setAlbumLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosLoading, setPhotosLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!albumId) return;
    const ref = doc(db, "albums", albumId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setAlbumName("");
          setAlbumMissing(true);
          setError("앨범을 찾을 수 없습니다.");
        } else {
          const data = snap.data() as { name?: string };
          setAlbumName(data.name || "");
          setAlbumMissing(false);
          setError(null);
        }
        setAlbumLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err.message || "앨범을 불러오지 못했습니다.");
        setAlbumLoading(false);
      },
    );
    return () => unsub();
  }, [albumId]);

  useEffect(() => {
    if (!albumId) return;
    const photosRef = collection(db, "albums", albumId, "photos");
    const q = query(photosRef, orderBy("name"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setPhotos(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Photo, "id">),
          })),
        );
        setPhotosLoading(false);
      },
      (err) => {
        console.error(err);
        setError(err.message || "사진 목록을 불러오지 못했습니다.");
        setPhotosLoading(false);
      },
    );
    return () => unsub();
  }, [albumId]);

  const handleAddPhoto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = photoName.trim();
    const url = photoUrl.trim();
    if (!name || !url || !albumId) return;
    setSaving(true);
    setError(null);
    try {
      await addDoc(collection(db, "albums", albumId, "photos"), { name, url });
      setPhotoName("");
      setPhotoUrl("");
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "사진을 추가하지 못했습니다.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const loading = albumLoading || photosLoading;

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={RouterLink}
          to="/albums"
          underline="hover"
          color="inherit"
        >
          앨범
        </Link>
        <Typography color="text.primary">
          {albumLoading ? "…" : albumName || "앨범"}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1">
        {albumLoading ? "로딩 중…" : albumName || "앨범"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        사진
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, opacity: albumMissing ? 0.5 : 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          사진 추가
        </Typography>
        <Stack
          component="form"
          onSubmit={handleAddPhoto}
          spacing={1}
          sx={{ maxWidth: 480 }}
        >
          <TextField
            label="사진 이름"
            value={photoName}
            onChange={(e) => setPhotoName(e.target.value)}
            size="small"
            fullWidth
            disabled={albumMissing}
          />
          <TextField
            label="사진 URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            size="small"
            fullWidth
            placeholder="https://..."
            disabled={albumMissing}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={
              albumMissing ||
              saving ||
              !photoName.trim() ||
              !photoUrl.trim() ||
              !albumId
            }
          >
            추가
          </Button>
        </Stack>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      {loading && (
        <Stack sx={{ alignItems: "center", py: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {!loading && !albumMissing && photos.length === 0 && (
        <Typography color="text.secondary">등록된 사진이 없습니다.</Typography>
      )}

      {!loading && photos.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {photos.map((p) => (
            <Card key={p.id} variant="outlined">
              <CardMedia
                component="img"
                height="180"
                image={p.url}
                alt={p.name || ""}
                sx={{ objectFit: "cover", bgcolor: "action.hover" }}
                onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography variant="subtitle2">
                  {p.name || "(이름 없음)"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ wordBreak: "break-all", display: "block", mt: 0.5 }}
                >
                  {p.url}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default AlbumPhotosPage;
