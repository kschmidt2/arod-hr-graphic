var app = angular.module('myApp', [
  '720kb.tooltips'
]);

app.controller('ARodController', function($http) {

    console.log("success!");

    this.homeruns = [];
    var _this = this;
    $http.get('js/homeruns.json')
      .success(function(data){
        _this.homeruns = data;
      })
      .error(function(msg) {
      });

    //show and hide more info div
    // this.getInfo = function(homerunName) {
    //
    //   for (i = 0; i < this.homeruns.length; i++) {
    //
    //     if (homerunName == this.homeruns[i].name) {
    //
    //       var homerunInfo = "";
    //
    //       console.log("this worked!");
    //
    //       homerunInfo += '<div class="homerunname">' + this.homeruns[i].name + '</div>';
    //
    //       // current senator party
    //       if (this.homeruns[i].incumbent.party == "Republican") {
    //
    //         homerunInfo += '<div class="repstrip"><h3>current senator</h3></div>';
    //
    //       } else if (this.homeruns[i].incumbent.party == "Democrat"){
    //
    //         homerunInfo += '<div class="demstrip"><h3>current senator</h3></div>';
    //
    //       } else {
    //         homerunInfo += '<div class="otherstrip"><h3>current senator</h3></div>';
    //       }
    //
    //       homerunInfo += '<div class="senatorname">' + this.homeruns[i].incumbent.name + '</div><div class="senatorparty">' + this.homeruns[i].incumbent.party + "</div>";
    //
    //       // featured candidate party
    //       if (this.homeruns[i].open == "open") {
    //
    //         if (this.homeruns[i].featuredCandidate.party == "Republican") {
    //
    //           homerunInfo += '<div class="repstrip"><h3>featured candidate</h3></div>';
    //
    //         } else {
    //
    //           homerunInfo += '<div class="demstrip"><h3>featured candidate</h3></div>';
    //
    //         }
    //
    //         // featured candidate info
    //         homerunInfo += '<img class="candidatephoto" src="' + this.homeruns[i].featuredCandidate.photo + '">';
    //         homerunInfo += '<div class="senatorname">' + this.homeruns[i].featuredCandidate.name + '</div><div class="featuredparty">' + this.homeruns[i].featuredCandidate.party + "</div>";
    //         homerunInfo += '<div class="moreinfo"><b style="text-transform:uppercase">About: </b>' + this.homeruns[i].featuredCandidate.bio + '<br /><b style="text-transform:uppercase">Platform points: </b>' + this.homeruns[i].featuredCandidate.platform + '</div>';
    //         homerunInfo += '<div class="otherstrip"><h3>other candidates</h3></div>';
    //
    //         // list other candidates if there are
    //         if (this.homeruns[i].otherCandidates !== "none") {
    //
    //           console.log("this also worked!");
    //
    //
    //           for (j = 0; j < this.homeruns[i].otherCandidates.length; j++) {
    //             console.log("more candidates success");
    //
    //             homerunInfo += '<div class="othercandidates"><b>' + this.homeruns[i].otherCandidates[j].name + '</b>, ' + this.homeruns[i].otherCandidates[j].party + '</div>';
    //           }
    //
    //           // displays none if there are no other candidates
    //         } else {
    //           homerunInfo += 'None';
    //         }
    //
    //       }
    //
    //       document.getElementById("sidebar").innerHTML = homerunInfo;
    //
    //     }
    //   }
    //
    // }
});
