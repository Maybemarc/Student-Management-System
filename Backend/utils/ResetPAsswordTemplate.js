const passwordResetTemplate = (resetLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
    <style>
      body {
        background-color: #f4f4f7;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 500px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        padding: 30px;
      }
      h1 {
        color: #333333;
        font-size: 22px;
        text-align: center;
      }
      p {
        color: #555555;
        font-size: 16px;
        line-height: 1.5;
      }
      .btn {
        display: inline-block;
        margin: 20px 0;
        padding: 12px 20px;
        background-color: #007BFF;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #888888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>We received a request to reset your password. Click the button below to set a new password. This link will expire in 15 minutes.</p>
      <div style="text-align:center;">
        <a href="${resetLink}" class="btn">
          Reset Password
        </a>
      </div>
      <p>If you did not request this, you can safely ignore this email.</p>
      <div class="footer">
        © ${new Date().getFullYear()} Your App Name. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

export default passwordResetTemplate;
