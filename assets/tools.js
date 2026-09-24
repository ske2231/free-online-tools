/* Shared helpers for the Free Online Tools site. Tool-specific logic is inline per page. */
(function () {
  'use strict';

  /** Download a Blob with a filename. */
  window.downloadBlob = function (blob, filename) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  };

  /** Copy text to clipboard; returns a Promise. */
  window.copyText = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(new Error('copy failed')); }
      catch (e) { reject(e); }
      ta.remove();
    });
  };

  /** Read a File as a data URL. */
  window.readFileAsDataURL = function (file) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(r.result); };
      r.onerror = function () { reject(new Error('Could not read file.')); };
      r.readAsDataURL(file);
    });
  };

  /** Load an image element from a data URL / object URL. */
  window.loadImage = function (src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error('Could not load image.')); };
      img.src = src;
    });
  };

  /** Human-readable byte size. */
  window.formatBytes = function (bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  };

  /** Show a transient message in #msg element (if present). */
  window.flash = function (text, ok) {
    var el = document.getElementById('msg');
    if (!el) return;
    el.textContent = text;
    el.className = ok ? 'success' : 'error';
  };

  /** Wire a "copy" button: <button data-copy data-copy-target="#output">. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var target = document.querySelector(btn.getAttribute('data-copy-target'));
    if (!target) return;
    var text = ('value' in target) ? target.value : target.textContent;
    window.copyText(text).then(
      function () { flash('Copied to clipboard!', true); },
      function () { flash('Copy failed. Select and copy manually.', false); }
    );
  });
})();
