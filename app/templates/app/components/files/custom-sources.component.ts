

import { Component, Input } from '@angular/core';

@Component({
    selector: 'adf-custom-sources-demo',
    templateUrl: 'custom-sources.component.html'
})
export class CustomSourcesComponent {

    @Input()
    selectedSource = '-recent-';

    sources = [
        { title: 'Favorites', value: '-favorites-' },
        { title: 'Recent', value: '-recent-' },
        { title: 'Shared Links', value: '-sharedlinks-' },
        { title: 'Sites', value: '-sites-' },
        { title: 'Trashcan', value: '-trashcan-' },
        { title: 'Root', value: '-root-' },
        { title: 'My', value: '-my-' },
        { title: 'Shared', value: '-shared-' }
    ];
}
