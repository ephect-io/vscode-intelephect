import { formatEphectDocument } from '../server/ephectFormatter';

describe('Ephect Formatter', (): void => {
  test('formatter basic indentation', (): void => {
    const input: string = `
@for %x as %y do
@op echo %y
@done
@op echo "end"
`;

    const expected: string = `
@for %x as %y do
    @op echo %y
@done
@op echo "end"
`.trim();

    expect(formatEphectDocument(input).trim()).toBe(expected);
  });

  test('nested blocks indentation', (): void => {
    const input: string = `
@for %rows as %row do
@if %row->active do
@op echo %row->name
@done
@done
`;

    const expected: string = `
@for %rows as %row do
    @if %row->active do
        @op echo %row->name
    @done
@done
`.trim();

    expect(formatEphectDocument(input).trim()).toBe(expected);
  });
});

export {};
