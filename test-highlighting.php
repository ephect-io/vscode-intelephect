<?php

namespace Test;

function testEphectSyntax($props): string 
{
    // Test standalone Ephect variables
    $variable = 'test';
    $object = new \stdClass();
    $object->property = 'value';
    $array = [];
    $array[0] = new \stdClass();
    $array[0]->item = 'data';

    return (<<< HTML
    
    // Test @op directives
    @op %counter = 0;
    @op %total = count(%items);
    @op %result = %counter + %total;
    
    // Test control structures
    @if %counter > 0 do
        echo "Counter is positive";
    @elseif %counter == 0 do
        echo "Counter is zero";  
    @else
        echo "Counter is negative";
    @done
    
    @for %items as %item do
        echo %item->name;
    @done
    
    @while %counter < 10 do
        @op %counter++;
    @done
    

    <div>
        @for %items as %item do
            <p>{{ item->title }}</p>
        @done
    </div>
    HTML);
}