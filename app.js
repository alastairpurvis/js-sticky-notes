var noteInput = document.getElementById("new-note");
var addButton = document.getElementsByTagName("button")[0];
var notesHolder = document.getElementById("archived-notes");

var createNewNoteElement = function(noteString) {
   var noteItem = document.createElement("li");
   var div = document.createElement("div");
   var editText = document.createElement("textarea");
   var editButton = document.createElement("button");
   var flagButton = document.createElement("button");
   var deleteButton = document.createElement("button");

   editButton.innerText = "Edit";
   editButton.className = "edit";
   flagButton.innerText = "Flag";
   flagButton.className = "flag";
   deleteButton.innerText = "Delete";
   deleteButton.className = "delete";

   div.innerHTML = noteString;
   noteItem.appendChild(div);
   noteItem.appendChild(editText);
   noteItem.appendChild(editButton);
   noteItem.appendChild(flagButton);
   noteItem.appendChild(deleteButton);

   return noteItem;
}

var addNote = function() {
   if (noteInput.value) {
       var noteItem = createNewNoteElement(noteInput.value.replace(/\r?\n/g, '<br />'));
       notesHolder.insertBefore(noteItem, notesHolder.childNodes[0]);
       bindNoteEvents(noteItem);
       noteInput.value = "";
   }
}

var editNote = function() {
   var noteItem = this.parentNode;
   var editText = noteItem.querySelector("textarea");
   var div = noteItem.querySelector("div");
   var edit = noteItem.querySelector(".edit");

   var containsClass = noteItem.classList.contains("editMode");
   if (containsClass) {
       if(editText.value){
           div.innerText = editText.value;
           edit.innerHTML = "Edit";
       }
       else {
           deleteNote.call(this);
       }
   } else {
       editText.value = div.innerText;
       edit.innerHTML = "Save";
   }

   noteItem.classList.toggle("editMode");
}

var flagNote = function() {
   var noteItem = this.parentNode;
   var div = noteItem.querySelector("div");
   var textArea = noteItem.querySelector("textarea");
   var ul = noteItem.parentNode;

   div.classList.toggle('flagged');
   textArea.classList.toggle('flagged');
   this.innerHTML = (this.innerHTML == 'Flag') ? 'Unflag' : 'Flag';
}

var deleteNote = function() {
   var noteItem = this.parentNode;
   var ul = noteItem.parentNode;

   ul.removeChild(noteItem);
}

var bindNoteEvents = function(noteItem) {
   var editButton = noteItem.querySelector("button.edit");
   var deleteButton = noteItem.querySelector("button.delete");
   var flagButton = noteItem.querySelector("button.flag");

   editButton.onclick = editNote;
   deleteButton.onclick = deleteNote;
   flagButton.onclick = flagNote;
}

addButton.addEventListener("click", addNote);
bindNoteEvents(document.getElementById("example"));
