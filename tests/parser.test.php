<?php
require_once __DIR__ . '/../src/EphectParser.php';

use Ephect\EphectParser;

$parser = new EphectParser();

$template = <<<EOT
@for %rows as %row do
@if %row->active do
@op echo %row->name
@done
@done
EOT;

$ast = $parser->parse($template);

assert(count($ast) === 1, "AST should have one top-level block (@for)");
assert($ast[0]['type'] === 'FOR', "Top-level block type should be FOR");
assert(count($ast[0]['children']) === 1, "FOR block should have 1 child (IF block)");
assert($ast[0]['children'][0]['type'] === 'IF', "Child block type should be IF");

echo "Parser tests passed.\n";
