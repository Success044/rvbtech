import assert from "node:assert/strict";
import { test } from "node:test";
import { getYouTubeVideoId } from "../src/lib/youtube.ts";

test("preserves all six supplied Shorts IDs, including the extra clip", () => {
  for (const id of [
    "uQhh8aSTmNc",
    "P4qw4DUPpsE",
    "STQfH9Ev9pk",
    "9GFVXdveaXE",
    "FbNtR23-sHE",
    "S1kni12wxtY",
  ]) {
    assert.equal(getYouTubeVideoId(`https://www.youtube.com/shorts/${id}`), id);
  }
});

test("accepts official watch, share, mobile, and embed links", () => {
  for (const url of [
    "https://www.youtube.com/watch?v=uQhh8aSTmNc&feature=share",
    "https://youtu.be/uQhh8aSTmNc?si=share",
    "https://m.youtube.com/shorts/uQhh8aSTmNc",
    "https://youtube.com/embed/uQhh8aSTmNc",
    "https://www.youtube.com/shorts/uQhh8aSTmNc/?feature=share",
  ]) {
    assert.equal(getYouTubeVideoId(url), "uQhh8aSTmNc", url);
  }
});

test("rejects foreign hosts, unsafe schemes, credentials, and malformed videos", () => {
  for (const url of [
    "javascript:alert(1)",
    "http://www.youtube.com/shorts/uQhh8aSTmNc",
    "https://youtube.com.example.com/shorts/uQhh8aSTmNc",
    "https://example.com/watch?v=uQhh8aSTmNc",
    "https://youtube.com@evil.example/shorts/uQhh8aSTmNc",
    "https://user:password@youtube.com/shorts/uQhh8aSTmNc",
    "https://youtube.com:8080/shorts/uQhh8aSTmNc",
    "https://youtube.com/watch",
    "https://youtube.com/shorts/too-short",
    "https://youtube.com/shorts/uQhh8aSTmNc/extra",
    "https://youtu.be/uQhh8aSTmNc/extra",
    "https://youtube.com/shorts/%3Cscript%3E",
    "not a URL",
  ]) {
    assert.equal(getYouTubeVideoId(url), null, url);
  }
});
