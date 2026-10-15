"""Serve a Next.js static export with compression for realistic local audits."""
import gzip
import io
import pathlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'out'

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = pathlib.Path(self.translate_path(self.path))
        if path.is_dir():
            path = path / 'index.html'
        if not path.is_file():
            self.send_error(404)
            return None
        data = path.read_bytes()
        content_type = self.guess_type(str(path))
        compress = 'gzip' in self.headers.get('Accept-Encoding', '') and path.suffix in {'.html', '.js', '.css', '.json', '.svg', '.txt'}
        if compress:
            data = gzip.compress(data)
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Vary', 'Accept-Encoding')
        self.send_header('Cache-Control', 'no-cache' if path.suffix == '.html' else 'public, max-age=3600')
        if compress:
            self.send_header('Content-Encoding', 'gzip')
        self.end_headers()
        return io.BytesIO(data)

class Server(ThreadingHTTPServer):
    request_queue_size = 128

if __name__ == '__main__':
    print('Portfolio preview: http://127.0.0.1:3000', flush=True)
    Server(('127.0.0.1', 3000), Handler).serve_forever()
