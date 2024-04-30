
import { NextResponse, sendFile } from 'next/server';
import fs from 'fs'
import JSZip from 'jszip'
import { join } from 'path';
// import sendFile  from 'next/dist/server/next-server';
import path from 'node:path';
import AdmZip from 'adm-zip';


// export async function GET(request: Request) {
//     try {

//         // const folderPath = '../zip'; // Folder to zip
//         // const zipPath = './temp';
//         // const zip = new JSZip();
//         // zip.file("hello.txt", "Hello World")
//         // const content = await zip.generateAsync({ type: "nodebuffer" });
//         // fs.writeFileSync("temp/_sample.zip", content)
//         // // let cp = __dirname
//         // return NextResponse.json({ message: 'Here is block details by hash!', content }, { status: 200 });
//         const filePath = join(process.cwd(), 'temp', 'your_zip_file.zip');

//         // Set appropriate headers for the response
//         res.setHeader('Content-Type', 'application/zip');
//         res.setHeader('Content-Disposition', 'attachment; filename=your_zip_file.zip');

//         // Send the file as the response
//         await sendFile(req, res, filePath);
//     } catch (error: any) {
//         const message = error.message || 'We ran into a problem Try again in a few minutes!';
//         return NextResponse.json({ message, data: error }, { status: 500 });

//     }
// } 

export async function POST(request: Request) {
    const _request = await request.json();
    console.log({ _request })
    const { sourceCode } = _request
    if (!sourceCode) {
        return NextResponse.json({ message: 'Source code is missing!', data: sourceCode }, { status: 400 });
    }
    const headers = new Headers();
    headers.append('Content-Disposition', 'attachment; filename=hardhat-project.zip');
    headers.append('Content-Type', 'application/zip');

    const zip = new AdmZip();
    zip.addFile('contracts/MyContract.sol', Buffer.from(sourceCode, 'utf8'));
    zip.addLocalFolder(path.join(process.cwd(), 'hardhat-project'));
    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
        headers,
    });
}