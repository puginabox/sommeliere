
(function () {
    "use strict";

    var app = angular
        .module("classResourceMock",
        ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var classes = [
            {
                "classId": 1,
                "bottle": "Barone Ricasoli Castello di Brolio Chianti Classico",                
                "vineyard": "xxxx",
                "year": "2008",
                "region": "Tuscany",
                "price": "10.99",
                "description": "Francesco Ricasoli has focused attention on this top wine of his family's estate, raising its stature while removing the riserva designation from its name. It's a cellarworthy 2008, with lush and delicious black cherry flavors in the middle, and meaty, black peppercorn-scented tannins giving the wine shape and density in the end. Balanced and sophisticated, this should age with grace. * 92 points Wine & Spirits Magazine, Apr 2012"
            },
            {
                "classId": 2,
                "bottle": "Coli Primo di Montignana",                
                "year": "2012",
                "region": "Tuscany",
                "variety": "Proprietary Red Blend",
                "vineyard": "xxxx",
                "price": "10.99",
                "description": "Violet and blackberry notes with a touch of barrique on the palate. It screams super-Tuscan and has a long and interesting finish that continues to evolve the more it sits. *Winemaker's notes"
            },
            {
                "classId": 3,
                "bottle": "Collazzi Liberta",                
                "year": "2012",                
                "price": "12.99",
                "region": "Tuscany",
                "variety": "Proprietary Red Blend",
                "vineyard": "xxxx",
                "description": "Color: Very deep, it tells of the excellent quality of the grapes. Perfume: Balsamic, typical of the main grape variety in the blend. Taste: Round, pervasive, with sweet tannins, perfectly balanced. Complex, long, yet not overpowering. *Winemaker's notes"
            },
            {
                "classId": 4,
                "bottle": "II Molino di Grace II Margone Chianti Classico Reserva",                
                "vineyard": "xxxx",
                "year": "2006",                
                "variety": "Proprietary Red Blend",
                "region": "Tuscany",
                "price": "34.99",
                "description": "The combination of intense balsamic and sweet cherry flavors and new oak mesh well in this maturing red. Shows an extra layer of tannins, but this remains harmonious overall, with a broad-shouldered profile. Excellent finish. Drink now through 2025. *93 points Wine Spectator, Oct 2013"
            },
            {
                "classId": 5,
                "bottle": "La Velona Rosso di Montalcino",                
                "year": "2011", 
                "variety": "Proprietary Red Blend",
                "price": "16.99",
                "region": "Tuscany",
                "vineyard": "xxxx",
                "description": "This elegant Rosso di Montalcino DOC is very aromatic, with notes of freshly cut flowers and spices. It is medium-bodied and smooth, with hints of licorice and red cherry finishing with well integrated tannins. Ready to drink now but will cellar well for up to 5 years. *Winemaker's notes"
            },
            {
                "classId": 6,
                "bottle": "La Velona Rosso di Montalcino",                
                "year": "2011", 
                "variety": "Proprietary Red Blend",
                "price": "16.99",
                "region": "Tuscany",
                "vineyard": "xxxx",
                "description": "This elegant Rosso di Montalcino DOC is very aromatic, with notes of freshly cut flowers and spices. It is medium-bodied and smooth, with hints of licorice and red cherry finishing with well integrated tannins. Ready to drink now but will cellar well for up to 5 years. *Winemaker's notes"
            },
            {
                "classId": 7,
                "bottle": "Rocca delle Macie di Fizzano",                
                "year": "2008", 
                "variety": "Proprietary Red Blend",
                "price": "19.99",
                "region": "Tuscany",
                "vineyard": "xxxx",
                "description": "The 2008 Chianti Classico Riserva di Fizzano boasts significant depth and sheer power. Black cherries, licorice, leather and mint are some of the notes that emerge from this intense Riserva. The French oak is quite prominent and is felt in the wine’s tannins and heft. The Fizzano is a bit rough around the edges, but still a solid effort for the year. Smoke, leather, licorice and a host of other dark aromas and flavors wrap around the muscular finish. Anticipated maturity: 2013-2020. *91 points Wine Advocate, Jun 2012"
            }
        ];

        var classesUrl = "/api/classes";

        $httpBackend.whenGET(classesUrl).respond(classes);

        var duplicateCheckRegex = new RegExp(classesUrl + "/[0-9][0-9]*" + "/.*", '');
        $httpBackend.whenGET(duplicateCheckRegex).respond(function (method, url, data) {
            var selectedClass = null;
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 2];
            var bottle = unescape(parameters[length - 1]);

            if (bottle) {
                for (var i = 0; i < classes.length; i++) {
                    if (classes[i].bottle == bottle &&
                        classes[i].classId != id) {
                        selectedClass = classes[i];
                        break;
                    }
                }
            }

            if (selectedClass) {
                return [200, selectedClass, {}];
            } else {
                return [404, selectedClass, {}];
            }
        });

        var editingRegex = new RegExp(classesUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var selectedClass = {"classId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < classes.length; i++) {
                    if (classes[i].classId == id) {
                        selectedClass = classes[i];
                        break;
                    }
                }
            }

            return [200, selectedClass, {}];
        });

        $httpBackend.whenPOST(classesUrl).respond(function (method, url, data) {
            var selectedClass = angular.fromJson(data);

            if (!selectedClass.classId) {
                // new class Id
                selectedClass.classId = classes[classes.length - 1].classId + 1;
                classes.push(selectedClass);
            } else {
                // Updated class
                for (var i = 0; i < classes.length; i++) {
                    if (classes[i].classId == selectedClass.classId) {
                        classes[i] = selectedClass;
                        break;
                    }
                }
            }
            return [200, selectedClass, {}];
        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    })
}());
