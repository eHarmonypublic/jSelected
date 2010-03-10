/**
 * @title jSelected
 * @overview jQuery plugin to persist radio and checkbox state to a parent element.
 * @author Alex Bernier
 */
(function($){
    $.fn.jSelected = function(options){
        var settings = $.extend({
            events: "click",
            parentSelector: "li:eq(0)"
        }, options);

        //references
        var $selectedToFilter = this;
        var $this = this;
        
        //sync class with element state
        $this.filter(":checked").each(function(){
            $(this).parents(settings.parentSelector).addClass("selected");
        });

        $selectedToFilter.each(function(){
            var $group = $selectedToFilter.filter("[name=" + this.name + "]");

            $group.bind(settings.events, function(){
                var $this = $(this);

                //uncheck others in group
                $group.not(":checked").each(function(){
                    $(this).parents(settings.parentSelector).removeClass("selected");
                });

                //add selected if checked
                if ($this.is(":checked")) {
                    $this.parents(settings.parentSelector).addClass("selected");
                }

                //select all if "any" is clicked
                if ($this.is(".rq-any-value")) {

                    if ($this.is(":checked")) {
                        $group.each(function(){
                            $this.attr("checked") = true;
                        }).parents(settings.parentSelector).addClass("selected");
                    }
                    else {
                        $group.each(function(){
                            $this.attr("checked") = false;
                        }).parents(settings.parentSelector).removeClass("selected");
                    }

                }
            });

            //remove just bound elements from master list of elements so they are not double bound
            $selectedToFilter = $selectedToFilter.not("[name=" + this.name + "]");

            if (!$selectedToFilter.length) return false;
        });

        return this;
    };
})(jQuery);