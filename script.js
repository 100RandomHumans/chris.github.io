(function () {
    var $ = function (i) { return document.getElementById(i) };
    /* nav */
    [].forEach.call(document.querySelectorAll("[data-t]"), function (a) { a.onclick = function (e) { e.preventDefault(); $(a.getAttribute("data-t")).scrollIntoView({ behavior: "smooth" }) } });
    /* hit counter */
    var n = 4217;
    try { n = (+localStorage.getItem("hits") || 4217) + 1; localStorage.setItem("hits", n) } catch (e) { }
    var s = String(n); while (s.length < 7) s = "0" + s;
    $("hits").innerHTML = s.split("").map(function (d) { return "<b>" + d + "</b>" }).join("");
    $("mq").textContent = n;
    /* security+ countdown */
    var days = Math.ceil((new Date(2026, 9, 31) - new Date()) / 864e5);
    $("cd").textContent = days > 0 ? days : (days === 0 ? "TODAY!!!" : "DONE?!");
    /* last updated */
    $("lu").textContent = new Date().toLocaleDateString();
    /* mood */
    var moods = ["caffeinated", "debugging", "hungry for free food", "compiling…", "sudo make me a sandwich", "in the Matrix", "YOLO", "touching grass"], mi = 0;
    $("moodbtn").onclick = function (e) { e.preventDefault(); mi = (mi + 1) % moods.length; $("mood").textContent = moods[mi] };
    /* guestbook */
    $("gs").onclick = function (e) {
        e.preventDefault();
        var nm = $("gn").value.trim() || "Anonymous", m = $("gm").value.trim(); if (!m) return;
        var d = document.createElement("div"); d.className = "gb";
        var b = document.createElement("b"); b.textContent = nm + ": ";
        d.appendChild(b); d.appendChild(document.createTextNode(m));
        $("gbl").appendChild(d); $("gm").value = ""; $("gn").value = ""
    };
    /* sparkle cursor trail */
    var last = 0, st = ["✦", "★", "✧", "✨", "💾", "🐢"];
    function sp(x, y) {
        var t = Date.now(); if (t - last < 35) return; last = t;
        var e = document.createElement("span"); e.className = "tc"; e.textContent = st[Math.floor(Math.random() * st.length)];
        e.style.left = x + "px"; e.style.top = y + "px"; document.body.appendChild(e);
        setTimeout(function () { e.remove() }, 800)
    }
    document.addEventListener("mousemove", function (e) { sp(e.clientX, e.clientY) });
    document.addEventListener("touchmove", function (e) { var t = e.touches[0]; if (t) sp(t.clientX, t.clientY) }, { passive: true });
    /* annoying popup */
    var pop = $("pop"), no = $("no"), dodge = 0;
    setTimeout(function () { pop.style.display = "flex" }, 1500);
    function run(e) {
        if (e) e.preventDefault(); dodge++;
        no.style.left = Math.floor(Math.random() * 180) + "px";
        no.style.top = Math.floor(Math.random() * 140 + 90) + "px"; no.style.bottom = "auto";
        if (dodge > 6) { no.textContent = "ok fine, close" }
        if (dodge > 9) { pop.style.display = "none" }
    }
    no.onmouseenter = run; no.onclick = run;
    $("yes").onclick = function (e) { e.preventDefault(); pop.style.display = "none"; alert("Ran out of budget, sorry!") };
})();
