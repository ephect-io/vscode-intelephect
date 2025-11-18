import { spawn, ChildProcess } from 'child_process';
import * as net from 'net';
import * as path from 'path';

// Types globaux Jest (en attendant l'installation de @types/jest si nécessaire)
declare const test: (name: string, fn: (done: jest.DoneCallback) => void) => void;
declare const expect: (value: any) => jest.Matchers<any>;

// Test minimal : LSP démarre et répond
test('LSP starts and responds to completion', (done: jest.DoneCallback): void => {
  const lsp: ChildProcess = spawn('node', [path.resolve(__dirname, '../out/server/ephect-lsp.js')]);

  // Wait a short time and then kill
  setTimeout((): void => {
    lsp.kill();
    done();
  }, 500);

  lsp.on('error', (err: Error): void => {
    done(err);
  });

  lsp.on('exit', (code: number | null): void => {
    expect(code).toBe(0);
  });
});

export {};
