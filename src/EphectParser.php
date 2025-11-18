<?php

namespace Ephect;

class EphectParser
{
    public function parse(string $template): array
    {
        $lines = preg_split("/(\r\n|\n|\r)/", $template);

        $ast = [];
        $stack = [];

        foreach ($lines as $line) {
            $trim = trim($line);

            // Pattern : @keyword args do
            if (preg_match('/^@(if|elseif|else|for|while|switch|case|default)(.*)$/', $trim, $m)) {
                $node = [
                    "type" => strtoupper($m[1]),
                    "args" => trim($m[2]),
                    "children" => []
                ];
                $stack[] = &$node;
                $ast[] = &$node;
                continue;
            }

            // Pattern : do (sans @)
            if (preg_match('/^(.+?)\s*do$/', $trim)) {
                $node = [
                    "type" => "BLOCK",
                    "args" => $trim,
                    "children" => []
                ];
                $stack[] = &$node;
                $ast[] = &$node;
                continue;
            }

            // @done / @endswitch
            if (preg_match('/^@(done|endswitch)/', $trim)) {
                array_pop($stack);
                continue;
            }

            // Content inside block
            if (!empty($stack)) {
                $current = &$stack[count($stack) - 1];
                $current["children"][] = $trim;
            } else {
                $ast[] = $trim;
            }
        }

        return $ast;
    }
}
