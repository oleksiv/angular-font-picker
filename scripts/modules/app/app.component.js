'use strict';

import GoogleApiService from '../../../scripts/modules/app/services/google-api.service.js';
import app from "./app.module.js";

export default app.component('appComponent', {
        templateUrl: 'scripts/modules/app/app.component.html',
        controller: ['$scope', 'GoogleApiService', function ($scope, GoogleApiService) {
            $scope.items = [];
            $scope.filteredItems = [];
            $scope.currentPageFonts = [];

            $scope.currentOffset = 0;
            $scope.itemsPerPage = 10;

            $scope.fontSize = 40;
            $scope.fontSizes = [8, 12, 14, 20, 24, 32, 40, 64, 96, 120, 184, 280];


            $scope.searchQuery = '';

            $scope.content = 1;
            $scope.contentList = [
                {
                    index: 1,
                    title: 'Sentence',
                    content: 'Almost before we knew it, we had left the ground.',
                },
                {
                    index: 2,
                    title: 'Alphabet',
                    content: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
                },
                {
                    index: 3,
                    title: 'Paragraph',
                    content: 'A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.',
                },
                {
                    index: 4,
                    title: 'Numerals',
                    content: '1234567890',
                }
            ];

            $scope.customContent = '';

            this.$onInit = function () {
                $scope.fetchFonts();
            };

            $scope.searchQueryChanged = function () {
                $scope.filterItems();
                $scope.applyOffset();
            }

            $scope.getContent = function () {
                if ($scope.customContent) {
                    return $scope.customContent;
                }

                const searchResult = this.contentList.find(function (item) {
                    return item.index === $scope.content;
                });

                return searchResult.content;
            }


            $scope.fetchFonts = function () {
                GoogleApiService.fonts().then((result) => {
                    $scope.items = result.data.items;
                    $scope.filterItems();
                    $scope.applyOffset();
                });
            };


            $scope.nextPage = function () {
                $scope.currentOffset += this.itemsPerPage;
                $scope.applyOffset();
            }

            $scope.prevPageDoNotExist = function () {
                return $scope.currentOffset - $scope.itemsPerPage < 0;
            }

            $scope.lastPageDoNotExist = function () {
                return $scope.currentOffset + $scope.itemsPerPage + 1 >= $scope.items.length;
            }

            $scope.prevPage = function () {
                if ($scope.prevPageDoNotExist()) {
                    return;
                }
                $scope.currentOffset -= $scope.itemsPerPage;
                $scope.applyOffset();
            }

            $scope.applyOffset = function () {
                $scope.currentPageFonts = $scope.filteredItems.slice($scope.currentOffset, $scope.currentOffset + $scope.itemsPerPage);
            }

            $scope.filterItems = function () {
                $scope.filteredItems = $scope.items.filter(function (item) {
                    return item.family.toLowerCase().search($scope.searchQuery.toLowerCase()) !== -1;
                });
            }
        }]
    }
);
