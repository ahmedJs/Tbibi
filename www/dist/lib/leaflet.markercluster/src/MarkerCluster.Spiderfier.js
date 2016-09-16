L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var e,t=this.getAllChildMarkers(),i=this._group,r=i._map,s=r.latLngToLayerPoint(this._latlng);this._group._unspiderfy(),this._group._spiderfied=this,t.length>=this._circleSpiralSwitchover?e=this._generatePointsSpiral(t.length,s):(s.y+=10,e=this._generatePointsCircle(t.length,s)),this._animationSpiderfy(t,e)}},unspiderfy:function(e){this._group._inZoomAnimation||(this._animationUnspiderfy(e),this._group._spiderfied=null)},_generatePointsCircle:function(e,t){var i,r,s=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+e),n=s/this._2PI,o=this._2PI/e,a=[];for(a.length=e,i=e-1;i>=0;i--)r=this._circleStartAngle+i*o,a[i]=new L.Point(t.x+n*Math.cos(r),t.y+n*Math.sin(r))._round();return a},_generatePointsSpiral:function(e,t){var i,r=this._group.options.spiderfyDistanceMultiplier,s=r*this._spiralLengthStart,n=r*this._spiralFootSeparation,o=r*this._spiralLengthFactor*this._2PI,a=0,p=[];for(p.length=e,i=e-1;i>=0;i--)a+=n/s+5e-4*i,p[i]=new L.Point(t.x+s*Math.cos(a),t.y+s*Math.sin(a))._round(),s+=o/a;return p},_noanimationUnspiderfy:function(){var e,t,i=this._group,r=i._map,s=i._featureGroup,n=this.getAllChildMarkers();for(this.setOpacity(1),t=n.length-1;t>=0;t--)e=n[t],s.removeLayer(e),e._preSpiderfyLatlng&&(e.setLatLng(e._preSpiderfyLatlng),delete e._preSpiderfyLatlng),e.setZIndexOffset&&e.setZIndexOffset(0),e._spiderLeg&&(r.removeLayer(e._spiderLeg),delete e._spiderLeg);i.fire("unspiderfied",{cluster:this,markers:n}),i._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(e,t){var i,r,s,n,o=this._group,a=o._map,p=o._featureGroup,_=this._group.options.spiderLegPolylineOptions;for(i=0;i<e.length;i++)n=a.layerPointToLatLng(t[i]),r=e[i],s=new L.Polyline([this._latlng,n],_),a.addLayer(s),r._spiderLeg=s,r._preSpiderfyLatlng=r._latlng,r.setLatLng(n),r.setZIndexOffset&&r.setZIndexOffset(1e6),p.addLayer(r);this.setOpacity(.3),o.fire("spiderfied",{cluster:this,markers:e})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(e,t){var i,r,s,n,o,a,p=this,_=this._group,l=_._map,f=_._featureGroup,d=this._latlng,h=l.latLngToLayerPoint(d),u=L.Path.SVG,g=L.extend({},this._group.options.spiderLegPolylineOptions),y=g.opacity;for(void 0===y&&(y=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),u?(g.opacity=0,g.className=(g.className||"")+" leaflet-cluster-spider-leg"):g.opacity=y,i=0;i<e.length;i++)r=e[i],a=l.layerPointToLatLng(t[i]),s=new L.Polyline([d,a],g),l.addLayer(s),r._spiderLeg=s,u&&(n=s._path,o=n.getTotalLength()+.1,n.style.strokeDasharray=o,n.style.strokeDashoffset=o),r.setZIndexOffset&&r.setZIndexOffset(1e6),r.clusterHide&&r.clusterHide(),f.addLayer(r),r._setPos&&r._setPos(h);for(_._forceLayout(),_._animationStart(),i=e.length-1;i>=0;i--)a=l.layerPointToLatLng(t[i]),r=e[i],r._preSpiderfyLatlng=r._latlng,r.setLatLng(a),r.clusterShow&&r.clusterShow(),u&&(s=r._spiderLeg,n=s._path,n.style.strokeDashoffset=0,s.setStyle({opacity:y}));this.setOpacity(.3),setTimeout(function(){_._animationEnd(),_.fire("spiderfied",{cluster:p,markers:e})},200)},_animationUnspiderfy:function(e){var t,i,r,s,n,o,a=this,p=this._group,_=p._map,l=p._featureGroup,f=e?_._latLngToNewLayerPoint(this._latlng,e.zoom,e.center):_.latLngToLayerPoint(this._latlng),d=this.getAllChildMarkers(),h=L.Path.SVG;for(p._animationStart(),this.setOpacity(1),i=d.length-1;i>=0;i--)t=d[i],t._preSpiderfyLatlng&&(t.setLatLng(t._preSpiderfyLatlng),delete t._preSpiderfyLatlng,o=!0,t._setPos&&(t._setPos(f),o=!1),t.clusterHide&&(t.clusterHide(),o=!1),o&&l.removeLayer(t),h&&(r=t._spiderLeg,s=r._path,n=s.getTotalLength()+.1,s.style.strokeDashoffset=n,r.setStyle({opacity:0})));setTimeout(function(){var e=0;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&e++;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&(t.clusterShow&&t.clusterShow(),t.setZIndexOffset&&t.setZIndexOffset(0),e>1&&l.removeLayer(t),_.removeLayer(t._spiderLeg),delete t._spiderLeg);p._animationEnd(),p.fire("unspiderfied",{cluster:a,markers:d})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(e){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(e))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(e){this._spiderfied&&this._spiderfied.unspiderfy(e)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(e){e._spiderLeg&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow(),e.setZIndexOffset&&e.setZIndexOffset(0),this._map.removeLayer(e._spiderLeg),delete e._spiderLeg)}});