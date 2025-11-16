<?php

namespace Example\Advanced;

use function Ephect\Hooks\useEffect;

function ComplexComponent($props): string
{
    useEffect(function($props, $items, $counter, $maxItems) {
        $items = $props->items ?? [];
        $counter = 0;
        $maxItems = $props->maxItems ?? 10;
    });

    return (<<< HTML
    <div class="complex-component">
        <h2>Exemple avec toutes les directives Ephect</h2>
        
        <!-- Directive @op pour du code PHP inline -->
        @op $totalCount = count($items);
        @op $displayLimit = min($totalCount, $maxItems);
        
        <div class="stats">
            <p>Total d'éléments : {{ totalCount }}</p>
            <p>Limite d'affichage : {{ displayLimit }}</p>
        </div>

        <!-- Directive @if/@elseif/@else -->
        @if %totalCount == 0 do
            <div class="empty-state">
                <p>Aucun élément à afficher</p>
            </div>
        @elseif %totalCount > 100 do
            <div class="warning">
                <p>Attention : Beaucoup d'éléments ({{ totalCount }})</p>
            </div>
        @else
            <div class="normal-state">
                <p>{{ totalCount }} éléments disponibles</p>
            </div>
        @done

        <!-- Directive @for avec compteur -->
        <div class="items-list">
            @for %items as %item do
                @op $counter++;
                @if %counter <= $displayLimit do
                    <div class="item" data-index="{{ counter }}">
                        <h4>{{ item->title }}</h4>
                        <p>{{ item->description }}</p>
                        
                        <!-- Directive @while pour les tags -->
                        @if %item->tags do
                            <div class="tags">
                                @op $tagIndex = 0;
                                @while %tagIndex < count(item->tags) && %tagIndex < 5 do
                                    <span class="tag">{{ item->tags[tagIndex]->name }}</span>
                                    @op $tagIndex++;
                                @done
                            </div>
                        @done
                    </div>
                @done
            @done
        </div>

        <!-- Directive @do simple -->
        @do
            <div class="footer">
                <small>Généré le {{ date('d/m/Y H:i') }}</small>
            </div>
        @done

        <!-- Boucle @while pour pagination -->
        @if %totalCount > $displayLimit do
            <div class="pagination">
                @op $page = 1;
                @op $totalPages = ceil($totalCount / $displayLimit);
                
                @while %page <= $totalPages && %page <= 10 do
                    <a href="?page={{ page }}" class="page-link">{{ page }}</a>
                    @op $page++;
                @done
                
                @if %totalPages > 10 do
                    <span>... et {{ totalPages - 10 }} autres pages</span>
                @done
            </div>
        @done

        <!-- Exemple complexe avec conditions imbriquées -->
        @for %items as %item do
            @if %item->category do
                @op $categoryClass = strtolower(str_replace(' ', '-', $item->category->name));
                
                <div class="item-{{ categoryClass }}">
                    @if %item->priority == 'high' do
                        <div class="priority-badge high">Priorité Haute</div>
                    @elseif %item->priority == 'medium' do
                        <div class="priority-badge medium">Priorité Moyenne</div>
                    @else
                        <div class="priority-badge low">Priorité Basse</div>
                    @done
                    
                    <h3>{{ item->title }}</h3>
                    
                    @if %item->subtasks do
                        <ul class="subtasks">
                        @for %item->subtasks as %subtask do
                            @if %subtask->completed do
                                <li class="completed">✓ {{ subtask->title }}</li>
                            @else
                                <li class="pending">○ {{ subtask->title }}</li>
                            @done
                        @done
                        </ul>
                    @done
                </div>
            @done
        @done
    </div>
    HTML);
}

function AdvancedTable($props): string
{
    useEffect(function($props, $data, $columns, $filters) {
        $data = $props->data ?? [];
        $columns = $props->columns ?? [];
        $filters = $props->filters ?? [];
    });

    return (<<< HTML
    <div class="advanced-table">
        @op $filteredData = [];
        @op $filterCount = 0;
        
        <!-- Application des filtres avec @while -->
        @for %data as %row do
            @op $passesFilter = true;
            @op $filterIndex = 0;
            
            @while %filterIndex < count($filters) && %passesFilter do
                @op $filter = $filters[$filterIndex];
                @if %filter->active do
                    @op $fieldValue = $row->getValue($filter->field);
                    @if %filter->operator == 'equals' && $fieldValue != $filter->value do
                        @op $passesFilter = false;
                    @elseif %filter->operator == 'contains' && !str_contains($fieldValue, $filter->value) do
                        @op $passesFilter = false;
                    @done
                @done
                @op $filterIndex++;
            @done
            
            @if %passesFilter do
                @op $filteredData[] = $row;
            @done
        @done
        
        <table class="data-table">
            <thead>
                <tr>
                @for %columns as %column do
                    <th>{{ column->title }}</th>
                @done
                </tr>
            </thead>
            <tbody>
            @for %filteredData as %row do
                <tr>
                @for %columns as %column do
                    <td>
                        @if %column->type == 'currency' do
                            @op $value = number_format($row->getValue($column->field), 2);
                            {{ value }} €
                        @elseif %column->type == 'date' do
                            @op $date = $row->getValue($column->field);
                            {{ date ? $date->format('d/m/Y') : 'N/A' }}
                        @else
                            {{ row->getValue(column->field) }}
                        @done
                    </td>
                @done
                </tr>
            @done
            </tbody>
        </table>
        
        @do
            <div class="table-summary">
                <p>{{ count(filteredData) }} résultats sur {{ count(data) }} total</p>
            </div>
        @done
    </div>
    HTML);
}