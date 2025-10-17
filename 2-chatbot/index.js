// import dependecies

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

/// import dan langasung panggil function
import 'dotenv/config';

const app = express();
const upload = multer();

const ai = new GoogleGenAI({ }); // instantiation

// inisiasi middleware
// contoh: app.use(namaMiddleware());
app.use(cors())
app.use(express.json())

// HTTP Methods: GET PUT PATCH POST DELETE OPTIONS

// function biasa --> functuin namaFunction() {}
// arrow function --> [const nama Function =] () => {}


// synchronous --> () => {}
// async --> async () => {}
// inisiasi routing
// contoh app.get(),.put(),.post()
app.post('/generate-text', async (req, res) => {
    // terima jeroanny,a lalu cek di sini
    const { prompt } = req.body; // object destructuring

    // guard clause
    if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({
            success: false,
            message: "Prompt harus berupa string!",
            data: null
        })
    }

    // jeroannya
    try {
        const aiResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { text: prompt }
            ],
            // untuk customize
            config: {
                systemInstruction: "Harus detail"
            }
        });

        res.status(200).json({
            success: true,
            message: 'Berhasil dijawab',
            data: aiResponse.candidates
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Gagal kyknya',
            data: null
        })
    }
});

app.listen(3000, () => {
    console.log('I LOVE YOU 3000')
})