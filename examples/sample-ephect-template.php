<?php

namespace Example\Components;

use function Ephect\Hooks\useEffect;
use function Ephect\Hooks\useState;

function UserCard($props): string
{
    useEffect(function($props, $user, $isActive) {
        $user = $props->user ?? null;
        $isActive = $props->isActive ?? false;
    });

    return (<<< HTML
    <div class="user-card">
        <div class="header">
            <h2>{{ user->name }}</h2>
            @if %isActive do
                <span class="badge active">Actif</span>
            @else  
                <span class="badge inactive">Inactif</span>
            @done
        </div>
        
        <div class="content">
            <p><strong>Email:</strong> {{ user->email }}</p>
            <p><strong>Rôle:</strong> {{ user->role->name }}</p>
            
            @if %user->permissions do
                <div class="permissions">
                    <h4>Permissions:</h4>
                    <ul>
                    @for %user->permissions as %permission do
                        <li>{{ permission->name }}</li>
                    @done
                    </ul>
                </div>
            @done
            
            @if %user->lastLogin do
                <p class="last-login">
                    <em>Dernière connexion: {{ user->lastLogin->format('d/m/Y H:i') }}</em>
                </p>
            @else
                <p class="never-logged">
                    <em>Jamais connecté</em>
                </p>
            @done
        </div>
        
        <div class="actions">
            @for %user->availableActions as %action do
                @if %action->enabled do
                    <button class="btn btn-{{ action->type }}">
                        {{ action->label }}
                    </button>
                @done
            @done
        </div>
    </div>
    HTML);
}

function DataTable($props): string
{
    useEffect(function($props, $columns, $data, $sortBy) {
        $columns = $props->columns ?? [];
        $data = $props->data ?? [];
        $sortBy = $props->sortBy ?? null;
    });

    return (<<< HTML
    <div class="data-table-container">
        <table class="data-table">
            <thead>
                <tr>
                @for %columns as %column do
                    <th class="sortable {{ sortBy == column->key ? 'sorted' : '' }}">
                        {{ column->label }}
                        @if %column->sortable do
                            <span class="sort-icon">⇅</span>
                        @done
                    </th>
                @done
                </tr>
            </thead>
            <tbody>
            @for %data as %row do
                <tr class="{{ row->cssClass ?? '' }}">
                @for %columns as %column do
                    <td>
                        @if %column->type == 'link' do
                            <a href="{{ row->getValue(column->key)->url }}">
                                {{ row->getValue(column->key)->text }}
                            </a>
                        @else
                            {{ row->getValue(column->key) }}
                        @done
                    </td>
                @done
                </tr>
            @done
            </tbody>
        </table>
        
        @if %data|length == 0 do
            <div class="empty-state">
                <p>Aucune donnée à afficher</p>
            </div>
        @done
    </div>
    HTML);
}