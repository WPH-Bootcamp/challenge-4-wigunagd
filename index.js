const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

/* variable input */
let userinput;
let commandInput = "";
let isValidIndex = true;
/* variable input */

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak

  const today = new Date();
  const timestamp = today.toISOString().split('T')[0];
  const randomString = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `ID-${timestamp}-${randomString}`;
}

// console.log(generateUniqueId());

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan

  const toDoText = prompt("Create new todo item: ");

  if (toDoText === null || toDoText.trim() === "") {
    console.log("Null/empty input detected.");
  } else {
    const newToDo = {
      id: generateUniqueId(),
      text: toDoText.trim(),
      isCompleted: false
    }

    todos.push(newToDo);

    console.log("New todo is successfully created!");
    console.log("- ID:", newToDo.id);
    console.log("- Text:", newToDo.text);
    console.log("- Is Completed:", newToDo.isCompleted);
  }

}

function getuserinput(msgprompt, maxnumber) {

  commandInput = prompt(msgprompt);
  isValidIndex = true;

  if (commandInput === null || isNaN(commandInput) || commandInput.trim() === "") {
    isValidIndex = false;
  } else {
    if (commandInput <= 0 || commandInput > maxnumber) {
      isValidIndex = false;
    }
  }

  const rtn = {
    commandInput: commandInput,
    isValidIndex: isValidIndex
  };
  return rtn;
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai


  listTodos();
  if (todos.length > 0) {
    /* select menu */
    userinput = getuserinput("Enter the number of the todo you want to mark as COMPLETE:", todos.length);
    commandInput = userinput["commandInput"];
    isValidIndex = userinput["isValidIndex"];
    /* select menu */

    if (isValidIndex) {
      commandInput = commandInput - 1;
      const todoToUpdate = todos[commandInput];
      if (todoToUpdate.isCompleted) {
        console.log(`Todo "${todoToUpdate.text}" is already marked as [DONE].`);
        return;
      }

      todoToUpdate.isCompleted = true;

      console.log(`Success! Todo #${commandInput + 1} ("${todoToUpdate.text}") has been marked as [DONE].`);

    } else {
      console.log("Invalid number. Please enter a valid number from the list.");
    }
  }

}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus

  listTodos();

  if (todos.length > 0) {
    userinput = getuserinput("Enter the number of the todo you want to mark as DELETE:", todos.length);
    commandInput = userinput["commandInput"];
    isValidIndex = userinput["isValidIndex"];


    if (isValidIndex) {
      commandInput = commandInput - 1;
      const deletedTodo = todos[commandInput];

      todos.splice(commandInput, 1);

      console.log(`Successfully DELETED todo #${commandInput + 1}: "${deletedTodo.text}"`);

    } else {
      console.log("Invalid number. Please enter a valid number from the list.");
    }
  }
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar

  if (todos.length > 0) {
    console.log("----------------------------");
    console.log("Current todo lists (" + todos.length + ")");
    console.log("----------------------------");
    todos.forEach((todos, index) => {
      const statustodo = todos.isCompleted ? "[DONE]" : "[ACTIVE]";
      console.log(`${index + 1}. ${statustodo} | ${todos.text}`);
    });
    console.log("----------------------------");
  } else {
    console.log("----------------------------");
    console.log("No to-dos to display.");
    console.log("----------------------------");
  }
}

function displayMenu() {
  const menu = `
-----------------------------
    ToDo App Menu
-----------------------------
1: List all todos
2: Add new todo
3: Mark todo complete
4: Delete a todo
5: Exit/Quit
-----------------------------
`;
  console.log(menu);
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid

    displayMenu();

    /* select menu */
    userinput = getuserinput("Select Menu:", 5);
    commandInput = userinput["commandInput"];
    isValidIndex = userinput["isValidIndex"];
    /* select menu */

    if (isValidIndex) {
      console.log("");
      commandInput = Number(commandInput);

      switch (commandInput) {
        case 1:
          console.log("--- Menu: List Todos ---");
          listTodos();
          break;

        case 2:
          console.log("--- Menu: Add Todo ---");
          addTodo();
          break;

        case 3:
          console.log("--- Menu: Mark Complete ---");
          markTodoCompleted();
          break;

        case 4:
          console.log("--- Menu: Delete Todo ---");
          deleteTodo();
          break;

        case 5:
          console.log("Thank you for using the ToDo App. Goodbye!");
          running = false;
          break;

        default:
          break;
      }

      console.log("************************************");
      console.log("");
    } else {
      console.log("Invalid number. Please enter a valid number from the list.");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};