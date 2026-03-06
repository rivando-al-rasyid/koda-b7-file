const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const fs = require('node:fs');
const path = require('node:path');



const rl = readline.createInterface({ input, output });

const userFolder = 'user';
const getFilePath = (filename) => path.join(userFolder, filename);

const listFolder = fs.readdirSync(userFolder)

listFolder.forEach(list => {
  console.log(list)
});

console.log("pilihan 1, menambah file 2, menghapus 3, mengubah file 4, melihat file")
rl.question('Menu: ', (menu) => {
  const validMenus = ['1', '2', '3', '4'];

  if (!validMenus.includes(menu)) {
    console.log("Pilih dari 4 pilihan.");
    rl.close();
    return;
  }

  rl.question('Masukkan nama file dan jangan lupa tambahkan extension nya (default: test.txt): ', (fileInput) => {
    const filename = fileInput.trim() || 'test.txt';
    const filePath = getFilePath(filename);
    if (menu == 1) {
      rl.question('Masukkan konten file: ', (content) => {
        fs.writeFile(filePath, content, (err) => {
          if (err) console.error(err);
          else console.log(`File '${filePath}' berhasil dibuat!`);
          rl.close();
        });
      });

    } else if (menu == 2) {
      fs.unlink(filePath, (err) => {
        if (err) console.error(err);
        else console.log(`File '${filePath}' berhasil dihapus!`);
        rl.close();
      });

    } else if (menu == 3) {
      rl.question('Masukkan konten baru: ', (newContent) => {
        fs.writeFile(filePath, newContent, (err) => {
          if (err) console.error(err);
          else console.log(`File '${filePath}' berhasil diubah!`);
          rl.close();
        });
      });

    } else if (menu == 4) {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) console.error(err);
        else console.log(`\nIsi file '${filePath}':\n${data}`);
        rl.close();
      });
    }
  });
});