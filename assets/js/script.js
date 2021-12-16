try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition,
        recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}
var noteTextarea = $('#note-textarea'),
    instructions = $('#recording-instructions'),
    notesList = $('ul#notes'),
    noteContent = '';
// ambil semua catatan dari sesi sebelumnya dan tampilkan
var notes = getAllNotes();
renderNotes(notes);
/*-----------------------------
      Voice Recognition 
------------------------------*/
// Jika diset = false, maka proses akan berhenti setelah beberapa detik (tidak terdengar suara)
// kalau diset = true, proses berhenti akan menjadi lebih lama (15 detik)
// kita akan mengizinkan tetap merekam ketika user jeda
recognition.continuous = true;

// blok ini memanggil setiap waktu ketika Speech API menangkap baris
recognition.onresult = function(event) {

    // event ini adalah SpeechRecognitionEvent object
    // ini menahan semua baris yang kita berhasil tangkap
    // kita hanya butuh satu baris saat ini
    var current = event.resultIndex;

    // dapatkan transkrip apa yang dikatakan
    var transcript = event.results[current][0].transcript;

    // dapatkan transkrip sekarang untuk disisi ke Catatan kita
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if (!mobileRepeatBug) {
        noteContent += transcript;
        noteTextarea.val(noteContent);
    }
};

recognition.onstart = function() {
    instructions.text('Voice recognition berhasil diaktifkan. Coba berbicara dengan microphone.');
}

recognition.onspeechend = function() {
    instructions.text('Jika kamu diam beberapa saat, maka  voice recognition akan mati dengan sendirinya.');
}

recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
        instructions.text('Tidak ada suara yang terdeteksi. Coba lagi.');
    };
}

$('#start-record-btn').on('click', function(e) {
    if (noteContent.length) {
        noteContent += ' ';
    }
    recognition.start();
});


$('#pause-record-btn').on('click', function(e) {
    recognition.stop();
    instructions.text('Voice recognition dijeda.');
});

// sync teks didalam textarea dengan noteContent variabel
noteTextarea.on('input', function() {
    noteContent = $(this).val();
})

$('#save-note-btn').on('click', function(e) {
    recognition.stop();
    if (!noteContent.length) {
        instructions.text('Tidak bisa menyimpan catatan kosong. Silahkan tambahkan pesan ke catatan Anda.');
    } else {
        // Simpan catatan ke localstorage.
        // kunci nya adalah dateTime, nilainya adalah isi dari catatan.
        saveNote(new Date().toLocaleString(), noteContent);

        noteContent = '';
        renderNotes(getAllNotes());
        noteTextarea.val('');
        instructions.text('Catatan berhasil disimpan.');
    }
})

notesList.on('click', function(e) {
    e.preventDefault();
    var target = $(e.target);

    // mendengarkan catatan yang dipilih / diklik
    if (target.hasClass('listen-note')) {
        var content = target.closest('.note').find('.content').text();
        readOutLoud(content);
    }

    // hapus catatan
    if (target.hasClass('delete-note')) {
        var dateTime = target.siblings('.date').text();
        deleteNote(dateTime);
        target.closest('.note').remove();
    }
});
function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance(); 
    // isi kalimat dan atribut voice
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = "id-ID";

    window.speechSynthesis.speak(speech);
}
function renderNotes(notes) {
    var html = '';
    if (notes.length) {
        notes.forEach(function(note) {
            html += `<li class="note">
                        <p class="header">
                            <span class="date">${note.date}</span>
                                <a href="#" class="listen-note" title="Listen to Note">Listen to Note</a>
                                <a href="#" class="delete-note" title="Delete">Delete</a>
                        </p>
                        <p class="content">${note.content}</p>
                    </li>`;
        });
    } else {
        html = '<li><p class="content">Kamu tidak memiliki pesan suara.</p></li>';
        console.log("Kamu tidak memiliki pesan suara.");
    }
    notesList.html(html);
}


function saveNote(dateTime, content) {
    localStorage.setItem('note-' + dateTime, content);
}
/* future */
function renderSingleNote(note) {
    if (note) {
        var html = '';
        html += `<li class="note">
                    <p class="header">
                        <span class="date">${note.date}</span>
                            <a href="#" class="listen-note" title="Listen to Note">Listen to Note</a>
                            <a href="#" class="delete-note" title="Delete">Delete</a>
                    </p>
                    <p class="content">${note.content}</p>
                </li>`;
    } else {
        html = '<li><p class="content">Kamu tidak memiliki pesan suara.</p></li>';
        console.log("No note");
    }
    notesList.html(html);
}
function getAllNotes() {
    var notes = [],
        key, i = 0;
    for (i; i < localStorage.length; i++) {
        key = localStorage.key(i);

        if (key.substring(0, 5) == 'note-') {
            notes.push({
                date: key.replace('note-', ''),
                content: localStorage.getItem(localStorage.key(i))
            });
        }
    }
    return notes;
}
function deleteNote(dateTime) {
    localStorage.removeItem('note-' + dateTime);
}