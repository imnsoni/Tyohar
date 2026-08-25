#!/usr/bin/env python3
"""Generate a simple maroon/gold diya-style PNG icon for Tyohar."""
import struct
import zlib
from pathlib import Path

SIZE = 256


def pixel(x, y):
    # Normalize to -1..1
    nx = (x / (SIZE - 1)) * 2 - 1
    ny = (y / (SIZE - 1)) * 2 - 1
    r2 = nx * nx + ny * ny
    # Maroon background
    r, g, b = 107, 29, 29
    # Gold ring
    if 0.82 < r2**0.5 < 0.92:
        return 212, 160, 23, 255
    # Diya bowl
    bowl = (ny > 0.05) and (ny < 0.42) and (abs(nx) < 0.42 - (ny - 0.05) * 0.15)
    if bowl:
        return 196, 92, 38, 255
    # Flame
    flame = (ny < 0.08) and (ny > -0.38) and (abs(nx) < 0.12 + max(0, -ny) * 0.15)
    if flame:
        t = (-ny + 0.08) / 0.46
        return int(255), int(180 + 40 * t), int(40 + 80 * t), 255
    # Inner cream disc
    if r2**0.5 < 0.78:
        return 251, 244, 232, 255
    return r, g, b, 255


def write_png(path: Path):
    raw = b""
    for y in range(SIZE):
        raw += b"\x00"
        for x in range(SIZE):
            raw += bytes(pixel(x, y))

    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", SIZE, SIZE, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    path.write_bytes(png)


def main():
    assets = Path(__file__).resolve().parent.parent / "assets" / "images"
    assets.mkdir(parents=True, exist_ok=True)
    write_png(assets / "icon.png")
    write_png(assets / "android-icon-foreground.png")
    write_png(assets / "splash-icon.png")
    write_png(assets / "favicon.png")
    print("icons written", assets)


if __name__ == "__main__":
    main()
