/**
 * @ngdoc service
 * @name conversionApp.IncrementalService
 * @description
 * Service to assign incremental IDs to controllers that needs it
 */
app.factory('IncrementalService', function(){
	var id = 0;
	return {
		/**
	     * @ngdoc method
	     * @name conversionApp.IncrementalService#getId
	     * @methodOf conversionApp.IncrementalService
	     *
	     * @description
	     * Method to get an incremental id
	     * @example
	     * IncrementalService.getId(base);
	     * @returns {int} an id integer
	     */
		getId : function() {
			return id++;
		}
	};
});