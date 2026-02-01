import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";

function App() {
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    // ✅ Client-side validation
    if (!education || !experience || !careerGoal) {
      setResult("⚠️ Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:9090/api/career/guide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          education,
          experience,
          careerGoal
        })
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      setResult(data.recommendation);

    } catch (error) {
      setResult(
        "⚠️ Unable to fetch AI response at the moment. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Iron Lady AI Career Guide
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Personalized career guidance powered by AI
        </Typography>

        <Card sx={{ mt: 4, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <TextField
              fullWidth
              label="Your Education"
              placeholder="e.g., B.Tech / MBA"
              margin="normal"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />

            <TextField
              fullWidth
              label="Work Experience"
              placeholder="e.g., Fresher / 2 years IT"
              margin="normal"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />

            <TextField
              fullWidth
              label="Career Goal"
              placeholder="e.g., AI Engineer, Data Analyst"
              margin="normal"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                backgroundColor: "#6a1b9a",
                "&:hover": { backgroundColor: "#4a148c" }
              }}
              onClick={submitForm}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Get AI Career Guidance"
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card
            sx={{
              mt: 4,
              borderLeft: "6px solid #6a1b9a",
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recommended Path
              </Typography>

              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-line" }}
              >
                {result}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}

export default App;
