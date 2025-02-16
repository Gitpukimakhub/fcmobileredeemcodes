const express = require('express'); const app = express(); app.set('json spaces', 2); const port = 3000; const { GetCode } = require('./scr/fcm');

app.get('/api/fcm/codes', async (req, res) => { try { const rest = await GetCode(); res.json(rest); } catch (error) { res.status(500).json({ error: 'Gagal memuat data' }); } });

app.get('/', async (req, res) => { res.send(`<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Table</title>
  <style>
    body {
      font-family: "Inter", sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: #fff;
      color: #000;
      box-sizing: border-box;
    }
    .container {
      text-align: center;
      background: #fafafa;
      padding: 30px;
      border-radius: 8px;
      max-width: 80%;
      box-sizing: border-box;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: 1px solid #ccc;
    }
    .loader {
      border: 4px solid #ccc;
      border-top: 4px solid #000;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      margin: 15px auto;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    table {
      margin-top: 20px;
      border-collapse: collapse;
      width: 100%;
      background-color: #fff;
      table-layout: fixed;
      word-wrap: break-word;
    }
    th, td {
      border: 1px solid #000;
      padding: 10px;
      text-align: center;
    }
    th {
      background-color: #f0f0f0;
    }
    #table-container {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="loader" id="loader"></div>
    <h1 id="title">FC Mobile Redeem Codes</h1>
    <p id="desc">Use these codes to get rewards.</p>
    <div id="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Code</th>
            <th>Status</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody id="table-body"></tbody>
      </table>
    </div>
  </div>
  <script>
    window.addEventListener("DOMContentLoaded", loadData);
    async function loadData() {
      const res = await fetch("/api/fcm/codes");
      const data = await res.json();
      const tbody = document.getElementById("table-body");
      tbody.innerHTML = data.map(function(d) {
        return "<tr><td>" + d.date + "</td><td>" + d.code + "</td><td>" + d.status + "</td><td>" + d.reward + "</td></tr>";
      }).join("");
      document.getElementById("loader").style.display = "none";
      document.getElementById("table-container").style.display = "block";
    }
  </script>
</body>
</html>`);
});app.listen(port, () => { console.log(`Server berjalan di http://localhost:${port}`) });

