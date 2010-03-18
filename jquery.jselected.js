/*
 * Copyright (c) 2010 eHarmony.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
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
                if ($this.is(".jselected-any-value")) {

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