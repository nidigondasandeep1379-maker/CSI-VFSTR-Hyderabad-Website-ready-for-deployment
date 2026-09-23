import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = 'C:/Users/nidig/.gemini/antigravity/brain/71a53904-895c-4f14-ad7f-a27ad9c07f7d/.user_uploaded/media_1790157591693.png';

const coords = [
  { name: 'dr_v_baby', left: 128, top: 148, width: 130, height: 130 },
  { name: 'dr_c_kiran_mai', left: 288, top: 148, width: 130, height: 130 },
  { name: 'dr_s_nagini', left: 444, top: 148, width: 130, height: 130 },
  { name: 'dr_n_sandeep_chaitanya', left: 602, top: 148, width: 130, height: 130 },
  { name: 'mr_sk_saddam_hussain', left: 750, top: 148, width: 130, height: 130 },
];

async function run() {
  for (const c of coords) {
    const outPath = path.resolve(__dirname, `../uploads/${c.name}.jpg`);
    await sharp(imgPath)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .jpeg({ quality: 95 })
      .toFile(outPath);
    console.log(`Saved ${outPath}`);
  }
}

run();
