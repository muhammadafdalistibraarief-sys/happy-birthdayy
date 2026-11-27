
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. ELEMENTS
    // =====================================

    const envelope = document.getElementById("envelope");
    const openButton = document.getElementById("openButton");

    const burst = document.getElementById("fluttershyBurst");
    const pageTwo = document.getElementById("pageTwo");

    const toDurian = document.getElementById("toDurian");
    const durianNext = document.getElementById("durianNext");

    const durianDialogue = document.getElementById("durianDialogue");
    const mascot = document.getElementById("durianMascot");

    const letterText = document.getElementById("letterText");
    const enterDeepSea = document.getElementById("enterDeepSea");

    const jellyfishContainer =
        document.getElementById("jellyfishContainer");

    const oceanParticles =
        document.getElementById("oceanParticles");


    // =====================================
    // 2. VARIABLES
    // =====================================

    let alreadyOpened = false;
    let durianStarted = false;
    let letterStarted = false;
    let deepSeaStarted = false;

    let letterTimer = null;


    // =====================================
    // 3. FLUTTERSHY IMAGES
    // =====================================

    const poses = [
        "fluttershy-01-standing.png",
        "fluttershy-02-flying.png",
        "fluttershy-03-smiling.png",
        "fluttershy-04-flying-happy.png",
        "fluttershy-05-curious.png",
        "fluttershy-06-sleeping.png",
        "fluttershy-07-surprised.png",
        "fluttershy-08-looking-up.png"
    ];


    // =====================================
    // 4. MAGIC BURST
    // =====================================

    function createMagicBurst() {
        if (!burst) return;

        const symbols = ["✦", "✧", "✨", "★", "♡", "⋆"];

        for (let i = 0; i < 35; i++) {
            const sparkle = document.createElement("span");

            sparkle.className = "magic-sparkle";
            sparkle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 260;

            sparkle.style.setProperty(
                "--moveX",
                Math.cos(angle) * distance + "px"
            );

            sparkle.style.setProperty(
                "--moveY",
                Math.sin(angle) * distance + "px"
            );

            sparkle.style.setProperty(
                "--size",
                (12 + Math.random() * 20) + "px"
            );

            sparkle.style.setProperty(
                "--delay",
                Math.random() * 0.35 + "s"
            );

            burst.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 2500);
        }
    }


    // =====================================
    // 5. HEART EFFECT
    // =====================================

    function createHearts(wrapper) {
        const hearts = ["💛", "💕", "💖", "♡", "✨"];

        for (let i = 0; i < 8; i++) {
            const heart = document.createElement("span");

            heart.className = "click-heart";
            heart.textContent =
                hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.setProperty(
                "--heartX",
                (Math.random() - 0.5) * 120 + "px"
            );

            heart.style.setProperty(
                "--heartY",
                -(40 + Math.random() * 100) + "px"
            );

            wrapper.appendChild(heart);

            setTimeout(() => heart.remove(), 1200);
        }
    }


    // =====================================
    // 6. CREATE FLUTTERSHY
    // =====================================

    function createFluttershy() {
        if (!burst) return;

        burst.innerHTML = "";

        const positions = [
            { x: 12, y: 25 },
            { x: 37, y: 18 },
            { x: 63, y: 18 },
            { x: 88, y: 25 },
            { x: 12, y: 72 },
            { x: 37, y: 75 },
            { x: 63, y: 75 },
            { x: 88, y: 72 }
        ];

        poses.forEach(function (pose, i) {
            const wrapper = document.createElement("div");
            const character = document.createElement("img");
            const bubble = document.createElement("div");

            wrapper.className = "fluttershy-particle";

            character.src = "images/" + pose;
            character.alt = "Fluttershy";

            bubble.className = "fluttershy-bubble";
            bubble.textContent = "HBD DIVHA!! 💛";

            wrapper.appendChild(bubble);
            wrapper.appendChild(character);

            wrapper.style.left = positions[i].x + "%";
            wrapper.style.top = positions[i].y + "%";
            wrapper.style.animationDelay = (i * 0.12) + "s";

            wrapper.addEventListener("click", function () {
                wrapper.classList.remove("clicked");

                void wrapper.offsetWidth;

                wrapper.classList.add("clicked");

                bubble.textContent = "YAY DIVHA!! 💛";

                createHearts(wrapper);

                setTimeout(function () {
                    bubble.textContent = "HBD DIVHA!! 💛";
                    wrapper.classList.remove("clicked");
                }, 1300);
            });

            burst.appendChild(wrapper);
        });
    }


    // =====================================
    // 7. MR. DURIAN SPEECH
    // =====================================

    function showDurian() {
        if (!pageTwo || durianStarted) return;

        durianStarted = true;

        pageTwo.classList.remove("fluttershy-ready");
        pageTwo.classList.add("durian-mode");

        if (durianNext) {
            durianNext.style.display = "none";
        }

        const messages = [
            "EHEM! MINGGIR DULU SEMUANYA! 📢",
            "HALO DIVHA! KENALIN, GUE MR. DURIAN!",
            "GUE DATANG KHUSUS BUAT HARI SPESIAL LO NIH!",
            "HAPPY BIRTHDAY, DIVHA!! 🎉",
            "SEMOGA PANJANG UMUR DAN SEHAT SELALU!",
            "SEMOGA HARI-HARI LO PENUH KEBAHAGIAAN!",
            "JANGAN LUPA MAKAN BUAH... TERMASUK DURIAN! 😎",
            "OKE, SEKIAN DARI GUE. HAPPY BIRTHDAY!! 💚"
        ];

        let index = 0;

        if (mascot) {
            setTimeout(function () {
                mascot.classList.add("landed");
            }, 1100);
        }

        function speakNext() {
            if (index >= messages.length) {
                if (mascot) mascot.classList.remove("talking");

                if (durianNext) {
                    durianNext.style.display = "inline-block";
                }

                return;
            }

            if (durianDialogue) {
                durianDialogue.textContent = messages[index];

                durianDialogue.style.animation = "none";

                void durianDialogue.offsetWidth;

                durianDialogue.style.animation =
                    "bubbleAppear 0.4s ease both";
            }

            if (mascot) mascot.classList.add("talking");

            const duration = Math.max(
                1900,
                messages[index].length * 65
            );

            setTimeout(function () {
                if (mascot) mascot.classList.remove("talking");

                index++;

                setTimeout(speakNext, 800);
            }, duration);
        }

        setTimeout(speakNext, 1200);
    }


    // =====================================
    // 8. BIRTHDAY LETTER
    // =====================================

    const birthdayLetter =
        "haii, hepi besdey yaa, KEREN GA WEB YG SA BIKIN WKEKEEK, oiyaa semogaa dengan bertambahnya umur semua harapan dan keinginan yang ng inginkan bisa tercapai sepenuhnya, i hope all of ur dream become true, jangan sering pesimis ama apapun itu, dan jangan terlalu mikirin hal hal yang tidak harus dipikirin, semoga ngna hepi selalu dan tidak murung murung, keep smilee, dan ya mungkin pesan personal sih but i love u, BAYYYYYY";

    function startLetter() {
        if (!letterText || letterStarted) return;

        letterStarted = true;

        letterText.innerHTML = "";

        const pen = document.createElement("span");

        pen.className = "writing-pen";
        pen.textContent = "✒️";

        letterText.appendChild(pen);

        let index = 0;

        function writeNext() {
            if (index >= birthdayLetter.length) {
                pen.style.opacity = "0";

                if (enterDeepSea) {
                    enterDeepSea.style.display = "inline-block";
                }

                return;
            }

            const character = document.createElement("span");

            character.textContent = birthdayLetter[index];

            letterText.insertBefore(character, pen);

            const charRect = character.getBoundingClientRect();
            const parentRect = letterText.getBoundingClientRect();

            pen.style.left =
                (charRect.left - parentRect.left) + "px";

            pen.style.top =
                (charRect.top - parentRect.top - 22) + "px";

            index++;

            letterTimer = setTimeout(writeNext, 45);
        }

        writeNext();
    }


    // =====================================
    // 9. CREATE JELLYFISH
    // =====================================

    function createJellyfish() {
        if (!jellyfishContainer) return;

        jellyfishContainer.innerHTML = "";

        for (let i = 0; i < 16; i++) {
            const jelly = document.createElement("div");
            const bell = document.createElement("div");
            const tentacles = document.createElement("div");

            jelly.className = "jellyfish";
            bell.className = "jelly-bell";
            tentacles.className = "jelly-tentacles";

            for (let j = 0; j < 5; j++) {
                const tentacle = document.createElement("span");

                tentacles.appendChild(tentacle);
            }

            jelly.appendChild(bell);
            jelly.appendChild(tentacles);

            jelly.style.left = Math.random() * 95 + "%";
            jelly.style.top = Math.random() * 85 + "%";

            jelly.style.animationDelay =
                Math.random() * 8 + "s";

            jelly.style.animationDuration =
                (7 + Math.random() * 8) + "s";

            const size = 0.65 + Math.random() * 0.8;

            jelly.style.setProperty("--jellyScale", size);

            jellyfishContainer.appendChild(jelly);
        }
    }


    // =====================================
    // 10. OCEAN PARTICLES
    // =====================================

    function createOceanParticles() {
        if (!oceanParticles) return;

        oceanParticles.innerHTML = "";

        for (let i = 0; i < 45; i++) {
            const particle = document.createElement("span");

            particle.className = "ocean-particle";

            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 6 + "s";

            particle.style.animationDuration =
                (4 + Math.random() * 6) + "s";

            oceanParticles.appendChild(particle);
        }
    }


    // =====================================
    // 11. PAGE TRANSITIONS
    // =====================================

    if (toDurian) {
        toDurian.addEventListener("click", showDurian);
    }

    if (durianNext) {
        durianNext.addEventListener("click", function () {
            if (!pageTwo) return;

            pageTwo.classList.remove("durian-mode");

            pageTwo.classList.add("letter-mode");

            if (enterDeepSea) {
                enterDeepSea.style.display = "none";
            }

            startLetter();
        });
    }

    if (enterDeepSea) {
        enterDeepSea.addEventListener("click", function () {
            if (!pageTwo || deepSeaStarted) return;

            deepSeaStarted = true;

            clearTimeout(letterTimer);

            pageTwo.classList.remove("letter-mode");

            pageTwo.classList.add("deepsea-mode");

            createJellyfish();
            createOceanParticles();
        });
    }


    // =====================================
    // 12. OPEN ENVELOPE
    // =====================================

    function openEnvelope() {
        if (alreadyOpened) return;

        alreadyOpened = true;

        if (envelope) {
            envelope.classList.add("open");
        }

        setTimeout(function () {
            document.body.classList.add("show-page-two");

            createFluttershy();
            createMagicBurst();

            setTimeout(function () {
                if (pageTwo) {
                    pageTwo.classList.add("fluttershy-ready");
                }
            }, 800);

        }, 1000);
    }


    // =====================================
    // 13. BUTTON EVENTS
    // =====================================

    if (openButton && envelope) {
        openButton.addEventListener("click", openEnvelope);
        envelope.addEventListener("click", openEnvelope);
    }

});