use md5::Md5;
use sha1::Sha1;
use sha2::{Digest, Sha256, Sha512};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn hash_file(data: &[u8]) -> String {
    let md5 = hex::encode(Md5::digest(data));
    let sha1 = hex::encode(Sha1::digest(data));
    let sha256 = hex::encode(Sha256::digest(data));
    let sha512 = hex::encode(Sha512::digest(data));

    format!(
        "MD5\n{}\n\nSHA-1\n{}\n\nSHA-256\n{}\n\nSHA-512\n{}",
        md5, sha1, sha256, sha512
    )
}

#[wasm_bindgen]
pub fn hex_view(data: &[u8], max_bytes: usize) -> String {
    let count = data.len().min(max_bytes);
    let mut output = String::new();

    for offset in (0..count).step_by(16) {
        let end = (offset + 16).min(count);
        let chunk = &data[offset..end];

        output.push_str(&format!("{:08X}  ", offset));

        for i in 0..16 {
            if i < chunk.len() {
                output.push_str(&format!("{:02X} ", chunk[i]));
            } else {
                output.push_str("   ");
            }

            if i == 7 {
                output.push(' ');
            }
        }

        output.push(' ');

        for byte in chunk {
            if byte.is_ascii_graphic() || *byte == b' ' {
                output.push(*byte as char);
            } else {
                output.push('.');
            }
        }

        output.push('\n');
    }

    if data.len() > count {
        output.push_str(&format!(
            "\n... showing first {} bytes of {} total bytes",
            count,
            data.len()
        ));
    }

    output
}
