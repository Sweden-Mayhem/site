# Submissions

Share your best moments from Sweden Mayhem! Your screenshots may be featured in our weekly news.

---

## How to take a screenshot

1. Press **F8** to hide the GUI
2. Line up your shot
3. Press **F12** to take a screenshot
4. Press **F8** again to bring the GUI back
5. Upload your screenshot below!

---

## Submit a screenshot

<form id="upload-form" style="max-width:500px">
  <label style="display:block;margin:1em 0 0.3em;color:#b7cedd;font-weight:600">In-game username</label>
  <input type="text" id="player" placeholder="Your exact in-game name" required
    style="width:100%;padding:10px;background:#15243a;border:2px solid #2f4a6a;border-radius:4px;color:#ebf7ff;font-size:1em">

  <label style="display:block;margin:1em 0 0.3em;color:#b7cedd;font-weight:600">Screenshot</label>
  <input type="file" id="screenshot" accept="image/png,image/jpeg,image/webp" required
    style="width:100%;padding:10px;background:#15243a;border:2px solid #2f4a6a;border-radius:4px;color:#ebf7ff;font-size:1em">
  <p style="color:#5a7a94;font-size:0.85em;margin:0.3em 0">JPG, PNG, or WEBP. Max 10MB.</p>

  <button type="submit" class="button" style="margin-top:1em;cursor:pointer">Upload Screenshot</button>
  <p id="upload-status" style="margin-top:1em;min-height:1.5em"></p>
</form>

---

## Recently Approved Screenshots

<div id="gallery" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1em;margin:1em 0">
  <p style="color:#5a7a94;grid-column:1/-1">Loading gallery...</p>
</div>

<p style="color:#5a7a94;font-size:0.85em">
  Screenshots are reviewed before appearing in the gallery.
  Up to 5 screenshots per week per player.
  Your username is verified against the server - make sure you have joined at least once!
</p>

<script>
// --- Upload form ---
document.getElementById('upload-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  var status = document.getElementById('upload-status');
  var btn = this.querySelector('button');
  var player = document.getElementById('player').value.trim();
  var file = document.getElementById('screenshot').files[0];
  if (!player || !file) { status.innerHTML = '<span style="color:#ff5555">Please fill in all fields.</span>'; return; }
  btn.disabled = true;
  status.innerHTML = '<span style="color:#d4a035">Uploading...</span>';
  var fd = new FormData();
  fd.append('player', player);
  fd.append('file', file);
  try {
    var resp = await fetch('https://hytale.swedenmayhem.se/api/upload', { method: 'POST', body: fd });
    var data = await resp.json();
    if (resp.status === 201) {
      status.innerHTML = '<span style="color:#55ff55">Uploaded! Screenshot is pending review.</span>';
      document.getElementById('screenshot').value = '';
      loadGallery();
    } else {
      status.innerHTML = '<span style="color:#ff5555">' + (data.error || 'Upload failed') + '</span>';
    }
  } catch(err) {
    status.innerHTML = '<span style="color:#ff5555">Could not connect to the server.</span>';
  }
  btn.disabled = false;
});

// --- Gallery ---
async function loadGallery() {
  var el = document.getElementById('gallery');
  try {
    var resp = await fetch('https://hytale.swedenmayhem.se/api/screenshots?status=approved');
    var data = await resp.json();
    if (!data.screenshots || data.screenshots.length === 0) {
      el.innerHTML = '<p style="color:#5a7a94;grid-column:1/-1">No screenshots yet. Be the first to submit one!</p>';
      return;
    }
    var API_HOST = 'https://hytale.swedenmayhem.se';
    el.innerHTML = data.screenshots.map(function(s) {
      var player = s.player || 'unknown';
      var date = new Date(s.uploaded_at).toLocaleDateString();
      var url = API_HOST + s.url;
      return '<div style="background:#15243a;border:2px solid #2f4a6a;border-radius:6px;overflow:hidden">' +
        '<a href="' + url + '" target="_blank">' +
        '<img src="' + url + '" alt="Screenshot by ' + player + '" style="width:100%;height:200px;object-fit:cover;display:block;border:none;box-shadow:none;border-radius:0">' +
        '</a>' +
        '<div style="padding:8px 12px">' +
        '<span style="color:#b7cedd;font-weight:600">' + player + '</span>' +
        '<span style="color:#5a7a94;float:right;font-size:0.85em">' + date + '</span>' +
        '</div></div>';
    }).join('');
  } catch(err) {
    el.innerHTML = '<p style="color:#5a7a94;grid-column:1/-1">Gallery unavailable.</p>';
  }
}
loadGallery();
</script>

---

*Screenshots are reviewed before appearing in the weekly news. If you uploaded something inappropriate, it will be removed and your submission privileges may be revoked.*
