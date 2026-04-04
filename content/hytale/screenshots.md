# Screenshots

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
  <input type="text" id="username" placeholder="Your exact in-game name" required
    style="width:100%;padding:10px;background:#15243a;border:2px solid #2f4a6a;border-radius:4px;color:#ebf7ff;font-size:1em">

  <label style="display:block;margin:1em 0 0.3em;color:#b7cedd;font-weight:600">Screenshot</label>
  <input type="file" id="screenshot" accept="image/png,image/jpeg,image/webp" required
    style="width:100%;padding:10px;background:#15243a;border:2px solid #2f4a6a;border-radius:4px;color:#ebf7ff;font-size:1em">
  <p style="color:#5a7a94;font-size:0.85em;margin:0.3em 0">JPG, PNG, or WEBP. Max 10MB.</p>

  <button type="submit" class="button" style="margin-top:1em;cursor:pointer">Upload Screenshot</button>
  <p id="upload-status" style="margin-top:1em;min-height:1.5em"></p>
</form>

<script>
document.getElementById('upload-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  var status = document.getElementById('upload-status');
  var btn = this.querySelector('button');
  var username = document.getElementById('username').value.trim();
  var file = document.getElementById('screenshot').files[0];
  if (!username || !file) { status.innerHTML = '<span style="color:#ff5555">Please fill in all fields.</span>'; return; }
  btn.disabled = true;
  status.innerHTML = '<span style="color:#d4a035">Uploading...</span>';
  var fd = new FormData();
  fd.append('username', username);
  fd.append('file', file);
  try {
    var resp = await fetch('https://hytale.swedenmayhem.se/api/screenshot', { method: 'POST', body: fd });
    var data = await resp.json();
    if (data.success) {
      status.innerHTML = '<span style="color:#55ff55">' + data.message + '</span>';
      document.getElementById('screenshot').value = '';
    } else {
      status.innerHTML = '<span style="color:#ff5555">' + (data.error || 'Upload failed') + '</span>';
    }
  } catch(err) {
    status.innerHTML = '<span style="color:#ff5555">Could not connect to the server. Is it running?</span>';
  }
  btn.disabled = false;
});
</script>

---

*Up to 5 screenshots per week. Your username is verified against the server - make sure you have joined at least once! Screenshots may be featured in the weekly news with credit to you.*
