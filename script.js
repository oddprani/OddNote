const textArea = document.getElementById("textArea");
const saveBtn = document.getElementById("saveBtn");
const renameBtn = document.getElementById("renameBtn"); // Add a Rename Button
const linkDisplay = document.getElementById("linkDisplay");

// Get note name from URL or default to "Untitled"
const params = new URLSearchParams(window.location.search);
let noteName = params.get("note") || "Untitled";

// Set textarea content from local storage
const noteKey = `note_${noteName}`;
textArea.value = localStorage.getItem(noteKey) || "";

// Auto-save on input
textArea.addEventListener("input", () => {
    localStorage.setItem(noteKey, textArea.value);
});

// Save button event (for manual saving)
saveBtn.addEventListener("click", () => {
    localStorage.setItem(noteKey, textArea.value);
    alert("Note saved!");
});

// Rename functionality
renameBtn.addEventListener("click", () => {
    let newNoteName = prompt("Enter new filename:", noteName);

    if (!newNoteName || newNoteName.trim() === "") {
        alert("Filename cannot be empty!");
        return;
    }

    if (newNoteName === noteName) {
        alert("Filename is already the same.");
        return;
    }

    let newNoteKey = `note_${newNoteName}`;

    // Move content to new filename and delete the old one
    localStorage.setItem(newNoteKey, localStorage.getItem(noteKey));
    localStorage.removeItem(noteKey);

    // Redirect to new filename with the same content
    window.location.href = `note.html?note=${encodeURIComponent(newNoteName)}`;
});

// Generate a shareable link
saveBtn.addEventListener("click", () => {
    const shareableLink = `${window.location.origin}/note.html?note=${encodeURIComponent(noteName)}`;
    linkDisplay.innerHTML = `Shareable Link: <a href="${shareableLink}" target="_blank">${shareableLink}</a>`;
});
