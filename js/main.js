(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('siteNav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }

  /* ---------- Contact form: preselect topic from ?topic= ---------- */
  var topics = {
    sample: 'Sample chapter request',
    order: 'Order or delivery help',
    privacy: 'Privacy or data request',
    messaging: 'Messaging help'
  };
  var params = new URLSearchParams(window.location.search);
  var wanted = topics[params.get('topic')];
  var topicSelect = document.querySelector('select[name="topic"]');
  if (topicSelect && wanted) { topicSelect.value = wanted; }

  /* ---------- Order form: preselect e-book from ?book= ---------- */
  var bookSelect = document.querySelector('select[name="book"]');
  var wantedBook = params.get('book');
  if (bookSelect && wantedBook) {
    Array.prototype.forEach.call(bookSelect.options, function (o) {
      if (o.getAttribute('data-slug') === wantedBook) { bookSelect.value = o.value; }
    });
  }

  /* ---------- Library: topic filter + search ---------- */
  var grid = document.getElementById('bookGrid');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.book-card'));
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.chip-btn'));
    var search = document.getElementById('bookSearch');
    var count = document.getElementById('bookCount');
    var none = document.getElementById('noResults');
    var current = 'all';

    var apply = function () {
      var q = (search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var ok = (current === 'all' || card.getAttribute('data-cat') === current) &&
                 (!q || card.getAttribute('data-title').indexOf(q) !== -1);
        card.hidden = !ok;
        if (ok) { shown++; }
      });
      none.hidden = shown !== 0;
      count.textContent = 'Showing ' + shown + ' of ' + cards.length + ' e-books.';
    };

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        current = b.getAttribute('data-filter');
        buttons.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply();
      });
    });
    search.addEventListener('input', apply);

    var startCat = params.get('cat');
    if (startCat) {
      var target = buttons.filter(function (b) { return b.getAttribute('data-filter') === startCat; })[0];
      if (target) { target.click(); }
    }
  }

  /* ---------- Forms: build a prefilled email (no server needed) ---------- */
  var SUPPORT = 'support@mindsetresetbooks.com';

  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    var phone = form.querySelector('input[name="phone"]');
    var consent = form.querySelector('input[name="consent"]');
    var status = form.querySelector('.form-status');

    function syncPhoneRule() {
      if (!phone || !consent) { return; }
      phone.required = consent.checked || phone.hasAttribute('data-required');
      phone.setCustomValidity('');
    }
    if (consent) { consent.addEventListener('change', syncPhoneRule); }
    syncPhoneRule();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (phone && consent && consent.checked && !phone.value.trim()) {
        phone.setCustomValidity('Please enter your mobile number to receive messages.');
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var val = function (n) {
        var el = form.elements[n];
        return el ? String(el.value || '').trim() : '';
      };

      var topic = val('topic');
      var book = val('book');
      var subject = topic
        ? 'Mindset Reset Press: ' + topic
        : book
          ? 'Order request: ' + book
          : (form.getAttribute('data-subject') || 'Message from website');

      var lines = ['Name: ' + val('name'), 'Email: ' + val('email')];
      if (val('phone')) { lines.push('Mobile: ' + val('phone')); }
      if (topic) { lines.push('Topic: ' + topic); }
      if (book) { lines.push('E-book: ' + book); }
      if (val('message')) { lines.push('', val('message')); }

      if (consent) {
        lines.push('');
        if (consent.checked) {
          var text = form.querySelector('.consent span');
          lines.push('SMS/WhatsApp consent: YES');
          lines.push('Consent given on ' + new Date().toISOString() + ' via ' + window.location.href);
          if (text) { lines.push('Consent text: ' + text.textContent.replace(/\s+/g, ' ').trim()); }
        } else {
          lines.push('SMS/WhatsApp consent: NO (email replies only)');
        }
      }

      var href = 'mailto:' + SUPPORT +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\r\n'));

      if (status) {
        status.classList.remove('err');
        status.textContent = 'Your email app should open with your message ready. Press Send there to finish. If nothing opens, email us at ' + SUPPORT + '.';
      }
      window.location.href = href;
    });
  });
})();
