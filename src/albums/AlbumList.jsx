import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { db } from "../util/firebase";

const albumsCol = collection(db, "albums");

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(albumsCol, orderBy("name"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setAlbums(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError(err.message || "앨범을 불러오지 못했습니다.");
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const handleAddAlbum = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setSaving(true);
    setError(null);
    try {
      await addDoc(albumsCol, { name });
      setNewName("");
    } catch (err) {
      console.error(err);
      setError(err.message || "앨범을 추가하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        앨범
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          앨범 추가
        </Typography>
        <Stack
          component="form"
          onSubmit={handleAddAlbum}
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ sm: "flex-start" }}
        >
          <TextField
            label="앨범 이름"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            size="small"
            fullWidth
            sx={{ maxWidth: { sm: 360 } }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={saving || !newName.trim()}
          >
            추가
          </Button>
        </Stack>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      {loading && (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {!loading && albums.length === 0 && (
        <Typography color="text.secondary">등록된 앨범이 없습니다.</Typography>
      )}

      {!loading && albums.length > 0 && (
        <Paper variant="outlined">
          <List disablePadding>
            {albums.map((album) => (
              <ListItem key={album.id} disablePadding divider>
                <ListItemButton
                  component={RouterLink}
                  to={`/albums/${album.id}`}
                >
                  <ListItemText
                    primary={album.name || "(이름 없음)"}
                    secondary="사진 보기"
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Stack>
  );
};

export default AlbumList;
