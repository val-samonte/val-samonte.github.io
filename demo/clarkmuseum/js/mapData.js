var rawPoints = [{"id":1,"name":"Gallery I","desc":"A geo hub for the Filipino Spirit","x":1040,"y":135,"points":[{"name":"Between Two Volcanoes","x":423,"y":562},{"name":"Philippine Map with Photo ops","x":349,"y":595},{"name":"The Anatomy of mount Arayat","x":417,"y":388},{"name":"About Mount Arayat & Glossary","x":541,"y":367},{"name":"Candaba Wet Lands","x":681,"y":341},{"name":"Central Luzon Geography","x":466,"y":470},{"name":"Birth of 2 Volcanoes","x":484,"y":554},{"name":"Geology of Central Luzon","x":501,"y":619},{"name":"Monsoon & Typhoon","x":509,"y":681},{"name":"The Eruptive History of Mount Pinatubo","x":583,"y":662},{"name":"Ethnic Group, Aetas, etc.","x":677,"y":636},{"name":"Subic","x":738,"y":595},{"name":"Mixed use","x":707,"y":535},{"name":"Graphics & Circular Google Map","x":585,"y":519}]},{"id":2,"name":"Gallery II","desc":"The Filipino Spirit in Craft and Ritual","x":60,"y":445,"points":[{"name":"Green Wall","x":783,"y":482},{"name":"LED for AR","x":779,"y":437},{"name":"Network of Commerce","x":855,"y":447},{"name":"Cultural Map of Metro Clark","x":935,"y":421},{"name":"Narratives","x":1042,"y":388},{"name":"Boat with projector","x":923,"y":498},{"name":"Festivals with Flowing River effect and trees","x":1074,"y":496},{"name":"2D Church","x":1197,"y":335},{"name":"Lantern Festival","x":1285,"y":308},{"name":"Wood Carving Saints","x":1261,"y":367},{"name":"Penitensiya","x":1244,"y":455},{"name":"Pottery","x":1173,"y":472},{"name":"Furniture","x":1087,"y":603},{"name":"Pitoy Moreno Dolls, Weaving and other industries printed in roller shades","x":1353,"y":537}]},{"id":3,"name":"Gallery III","desc":"Filipino Spirit Rechanneled","x":150,"y":200,"points":[{"name":"Clark Airbase: A Nation Challenge","x":990,"y":595},{"name":"LED Wall for video clips, photos of Clark, Pinatubo, etc.","x":1033,"y":451},{"name":"Fort Stotsenburg","x":1126,"y":605},{"name":"Beginnings","x":1300,"y":521},{"name":"The 1920's","x":1187,"y":527},{"name":"The 1930's","x":1250,"y":388},{"name":"World War II","x":1134,"y":369},{"name":"Reconstruction","x":1193,"y":279},{"name":"Expansion","x":1087,"y":255},{"name":"Vietnam War Aftermath and more","desc":"Clark Becomes Philippine Base, In the Midst of Revolution, EDSA Revolution, New Construction, Closure Memorabilia","x":1294,"y":367},{"name":"Anatomy of Stratovolcano: Mount Pinatubo","x":978,"y":240},{"name":"Pinatubo Simulation","x":933,"y":291},{"name":"Aircraft Hangar Destroyed by Ash fall Diorama with text","x":960,"y":371}]},{"id":4,"name":"Gallery IV","desc":"The Filipino Spirit Renewed and Rising","x":1040,"y":135,"points":[{"name":"Freeport: A People's Spirited Freed","x":927,"y":414},{"name":"Mission","x":882,"y":431},{"name":"Vision","x":841,"y":445},{"name":"Mandate","x":798,"y":453},{"name":"Connectivity & Accessibility","x":910,"y":369},{"name":"CDC Timeline","x":640,"y":486},{"name":"Hologram with Text","x":582,"y":552},{"name":"Your Economic Haven in Asia Pacific","x":689,"y":371},{"name":"Clark Land Inventory is Vast","x":576,"y":332},{"name":"Professional Investment Support Services","x":380,"y":388},{"name":"Interactive Tablets","x":361,"y":749},{"name":"Hot Air Balloon","x":867,"y":648},{"name":"Exit Panel","x":796,"y":599}]}];

angular.module('wayfinder')
  .factory('mapData', function(localStorageService) {

    var updateGalleryData = function(galleryId, value) {
      localStorageService.set('gallery_'+galleryId, value);
    };

    var getGalleryData = function(galleryId) {
      return localStorageService.get('gallery_'+galleryId);
    };

    var checkGalleryData = function() {
      for(var i=1; i<=4; i++) {
        var data = localStorageService.get('gallery_'+i);
        if(!data) {
          localStorageService.set('gallery_'+i, rawPoints[i-1]);
        }
      }
    }

    var exportMap = function() {
      var obj = [];
      obj.push(localStorageService.get('gallery_1'));
      obj.push(localStorageService.get('gallery_2'));
      obj.push(localStorageService.get('gallery_3'));
      obj.push(localStorageService.get('gallery_4'));
      console.log(JSON.stringify(obj));
    }

    return {
      rawPoints: rawPoints,
      updateGalleryData: updateGalleryData,
      getGalleryData: getGalleryData,
      checkGalleryData: checkGalleryData,
      exportMap: exportMap
    };
  })




























