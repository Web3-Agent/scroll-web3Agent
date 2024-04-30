
import { NextResponse } from 'next/server';
import path from 'node:path';
import AdmZip from 'adm-zip';

export async function GET(request: Request) {

    const url = new URL(request.url);
    let code: any = url.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ message: 'Source code is missing!', data: code }, { status: 400 });
    }
    const headers = new Headers();
    headers.append('Content-Disposition', 'attachment; filename=hardhat-project.zip');
    headers.append('Content-Type', 'application/zip');

    const zip = new AdmZip();
    zip.addFile('contracts/MyContract.sol', Buffer.from(code, 'utf8'));
    zip.addLocalFolder(path.join(process.cwd(), 'hardhat-project'));
    const zipBuffer = zip.toBuffer();

    return new Response(zipBuffer, {
        headers,
    });
}