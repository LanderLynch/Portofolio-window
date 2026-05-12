import { auth, db } from "./firebase-config.js";
import { signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  addDoc,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const GUESTBOOK_LIMIT = 40;
const guestbookCollection = collection(db, "guestbookMessages");
const guestbookQuery = query(guestbookCollection, orderBy("createdAt", "asc"), limitToLast(GUESTBOOK_LIMIT));

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMessageDate(value) {
  const date = value?.toDate?.() || null;

  if (!date) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function initialsFor(name) {
  const cleanName = String(name || "Guest").trim();
  return cleanName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "G";
}

function setupDesktopFirebaseGuestbook() {
  const form = document.getElementById("guestbook-form");
  const nameInput = document.getElementById("guestbook-name");
  const messageInput = document.getElementById("guestbook-message");
  const submitButton = document.getElementById("guestbook-submit");
  const notesElement = document.getElementById("guestbook-notes");
  const statusElement = document.getElementById("guestbook-status");
  const countElement = document.getElementById("guestbook-count");

  if (!form || form.dataset.guestbookSource !== "firebase" || !nameInput || !messageInput || !notesElement) {
    return;
  }

  const setStatus = (message, tone = "info") => {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.dataset.tone = tone;
  };

  const setSubmitting = (isSubmitting) => {
    if (submitButton) {
      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting ? "Sending..." : "Send note";
    }
  };

  const renderEmptyState = () => {
    notesElement.innerHTML = `
      <article class="guestbook-note guestbook-note-empty">
        <div class="guestbook-avatar-mark">JO</div>
        <div>
          <strong>Jona OS</strong>
          <time>Waiting</time>
          <p>No Firebase messages yet. Be the first one here.</p>
        </div>
      </article>
    `;
  };

  const renderMessages = (messages) => {
    if (countElement) {
      countElement.textContent = String(messages.length);
    }

    if (!messages.length) {
      renderEmptyState();
      return;
    }

    notesElement.innerHTML = messages.map((message) => {
      const displayName = message.displayName || message.name || "Guest";
      return `
        <article class="guestbook-note">
          <div class="guestbook-avatar-mark">${escapeHtml(initialsFor(displayName))}</div>
          <div>
            <strong>${escapeHtml(displayName)}</strong>
            <time datetime="${escapeHtml(message.createdAt?.toDate?.()?.toISOString?.() || "")}">${escapeHtml(formatMessageDate(message.createdAt))}</time>
            <p>${escapeHtml(message.text || message.message || "")}</p>
          </div>
        </article>
      `;
    }).join("");

    notesElement.scrollTop = notesElement.scrollHeight;
  };

  onSnapshot(
    guestbookQuery,
    (snapshot) => {
      const messages = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
      renderMessages(messages);
      setStatus("Connected to Firebase.", "success");
    },
    (error) => {
      renderEmptyState();
      setStatus(error.message || "Could not load Firebase messages.", "error");
    }
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const displayName = nameInput.value.trim();
    const text = messageInput.value.trim();

    if (!displayName || !text) {
      setStatus("Add your name and message first.", "error");
      return;
    }

    setSubmitting(true);
    setStatus("Sending to Firestore...", "info");

    try {
      const credential = auth.currentUser || (await signInAnonymously(auth)).user;

      await addDoc(guestbookCollection, {
        uid: credential.uid,
        displayName,
        name: displayName,
        text,
        provider: "desktop-anonymous",
        source: "desktop-window",
        createdAt: serverTimestamp()
      });

      messageInput.value = "";
      setStatus("Message saved to Firebase.", "success");
    } catch (error) {
      setStatus(error.message || "Could not save the message.", "error");
    } finally {
      setSubmitting(false);
    }
  });
}

setupDesktopFirebaseGuestbook();
