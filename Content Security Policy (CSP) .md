# Content Security Policy (CSP) 

Content Security Policy（CSP）是一種瀏覽器安全機制，它用於減緩和阻止某些類型的攻擊，特別是針對跨站腳本攻擊（XSS）和數據注入攻擊。這些攻擊可以用於從數據竊取，到網站破壞，到惡意軟件分發等多種目的。通過在網頁中執行的腳本和其他資源的來源限制，CSP 可以有效地降低應用程式受到的風險。

CSP 是設計為完全向後兼容的。沒有支持 CSP 的瀏覽器仍然可以與實現 CSP 的服務器進行交互，反之亦然：不支持 CSP 的瀏覽器會忽略它，正常運作，默認使用網頁內容的同源政策。如果網站不提供 CSP 頭部，瀏覽器也會使用同源政策。

以下是 CSP 的一些重要概念和基本原則：

1. **標頭設定：** CSP 通常是通過 HTTP 響應標頭中的 `Content-Security-Policy` 或 `Content-Security-Policy-Report-Only` 設定的。前者是實際應用於瀏覽器的設定，而後者僅用於報告違規情況，而不阻止資源載入。

   ```plaintext
   Content-Security-Policy: 指令;
   ```

2. **指令（Directives）：** CSP 通過指令來定義允許的來源。指令包括：
   - `default-src`：設定默認的資源來源，如果其他指令沒有指定。
   - `script-src`：設定允許執行的腳本的來源。
   - `style-src`：設定允許應用於頁面的樣式表的來源。
   - `img-src`：設定允許顯示的圖片的來源。
   - `font-src`：設定允許字體文件的來源。
   - `connect-src`：設定允許發送請求的來源。
   - `media-src`：設定允許媒體文件的來源。
   - `object-src`：設定允許 `<object>`, `<embed>`, 和 `<applet>` 元素的來源。
   - 等等。

   每個指令可以包含一個或多個來源，例如 `'self'`（表示同源）、`https://example.com`（表示只允許從該域名載入資源）。

3. **報告機制：** CSP 還提供了報告機制，可以通報發現的違規情況。這對於調試和確保 CSP 正確設定非常有用。報告機制通常通過 `report-uri` 或 `report-to` 指令配置，將報告發送到指定的網址或報告組。

   ```plaintext
   Content-Security-Policy: 指令; report-uri /endpoint;
   ```

4. **Nonce 和 Hash：** 如果你需要允許特定內聯資源，可以使用 `nonce` 或 `hash`。`nonce` 是一個一次性的隨機值，而 `hash` 是資源的哈希值。

   ```plaintext
   Content-Security-Policy: script-src 'nonce-abc123';
   ```

   或者：

   ```plaintext
   Content-Security-Policy: script-src 'sha256-AbCdEf123=';
   ```

5. **緊張模式和報告模式：** CSP 可以在緊張模式和報告模式之間進行切換。在緊張模式下，CSP 將阻止不符合規定的資源載入，而在報告模式下，僅會報告違規情況而不阻止載入。

   ```plaintext
   Content-Security-Policy: 指令; upgrade-insecure-requests;
   ```

   上述指令中的 `upgrade-insecure-requests` 將不安全的 HTTP 請求升級為安全的 HTTPS 請求。

CSP 是一種強大的安全機制，可以提高網站的安全性，但在實施時需要小心，以確保它不會阻止合法的資源載入。在設定 CSP 時，最好進行測試和監控，以確保它符合預期的行為。

## Express 處理 CSP 政策

```javascript
const helmet = require("helmet");
// 使用 helmet 中間件
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'", "https://assets-lighthouse.s3.amazonaws.com"],
    },
  })
);
```