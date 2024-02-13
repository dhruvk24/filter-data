$('document').ready(function () {
   
    let urlfrag = $.deparam.fragment();
    let categories = typeof urlfrag.category !== 'undefined' ? urlfrag.category : [];
    let sortOrder = typeof urlfrag.sort  !== 'undefined' ? urlfrag.sort : 'asc';
    let ratings = typeof urlfrag.rating !== 'undefined' ? urlfrag.rating : []

    $('#selectCategories').select2({
        placeholder: "Select a Categories",
    });


// ASCENDING OR DESCENDING
$(":radio").each(function () {
    if ($(this).val() == sortOrder) {
        $(this).attr('checked', true)
    } else {
        $(this).attr('checked', false)
    }
})
$(":radio").on('change', function () {
    $.bbq.pushState({ sort: $(this).val() })
});


// FETCH CATEGORY OPTIONS
    $.ajax({
        url: '../task-2/fetch_category.php',
        success: function (response,status,xhr) {
            if(xhr.status==200){
                let data = JSON.parse(response);
         
                data.forEach(function (item) {
                    $('#selectCategories').append(`<option value="${item.category}">${item.category}</option>`)
                })
                // console.log(categories);
                if (categories !== null) {
                    $('#selectCategories').val(categories);
                    $('#selectCategories').trigger('change');
                }
            }    
        },
        statusCode: {
            204: function() {
              console.log("No Categories Available");;
            }
        },
        error: function(xhr,status,error){
            console.log(xhr.status,error);
        }
    })


//  CATEGORY FILTER
    $('#selectCategories').on('select2:select', function (e) {
        var data = e.params.data;
        if (!categories.includes(data.text))
            categories.push(data.text)
        $.bbq.pushState({ category: categories })
    });
    $('#selectCategories').on('select2:unselect', function (e) {
        var data = e.params.data.text;
        // console.log(data);
        let categories = typeof $.bbq.getState("category") !== 'undefined' ? $.bbq.getState("category") : [];

        if (categories.indexOf(data) != -1)
            categories.splice(categories.indexOf(data), 1)
        $.bbq.pushState({ category: categories })
        $('#selectCategories').select2('close')

    });

// // RATING FILTER
    $("input[name='rating[]']:checkbox").on('change', function () {
        let data = $(this).val();
        if (this.checked) {
            $(this).attr('checked', true)

            if (!ratings.includes(data))
                ratings.push(data)
            $.bbq.pushState({ rating: ratings })
        } else {
            $(this).attr('checked', false)
            if (ratings.indexOf(data) != -1)
                ratings.splice(ratings.indexOf(data), 1)
            $.bbq.pushState({ rating: ratings })
        }

    });

    ratings.forEach(function(value){
        $(`input[value='${value}'`).attr('checked', true)
    })

//  FETCH ON BUTTON CLICK 
    $.ajax({
        url: 'filter.php',
        type: 'GET',
        data:{
            sort:sortOrder,
            categories:categories,
            ratings:ratings
        },
        success: function (response,status,xhr) {
            if(xhr.status==200){
                let data = JSON.parse(response);

                $('#tableBody').html("");
                data.forEach((movie, i) => {
                    $('#tableBody').append(`
                        <tr>
                            <td>${movie.movie_name}</td>
                            <td>${movie.categories}</td>
                            <td>${movie.cast_crew}</td>
                            <td>${movie.rating}</td>
                        </tr>`
                    )
                });
            }
        },
        statusCode: {
            204: function() {
                $('#tableBody').html('<tr class="text-center" style="height:500px"><td colspan="4" class="text-danger">No Data for this filter</td></tr>');
                console.log("No Categories Available");
            }
        },
        error: function(xhr,status,error){
            console.log(xhr.status,error);
        }
    })
    $('#submit').click(function(){
        let categories = typeof $.bbq.getState("category") !== 'undefined' ? $.bbq.getState("category") : [];
        let sortOrder = typeof $.bbq.getState("sort") !== 'undefined' ? $.bbq.getState("sort") : 'asc';
        let ratings = typeof $.bbq.getState("rating") !== 'undefined' ? $.bbq.getState("rating") : [];

            $.ajax({
                url: 'filter.php',
                type: 'GET',
                data:{
                    sort:sortOrder,
                    categories:categories,
                    ratings:ratings
                },
                success: function (response,status,xhr) {
                    if(xhr.status==200){
                        let data = JSON.parse(response);
                        // console.log(response);
                        $('#tableBody').html("");
                        // console.log(data)
                        data.forEach((movie, i) => {
                            $('#tableBody').append(`
                                <tr>
                                    <td>${movie.movie_name}</td>
                                    <td>${movie.categories}</td>
                                    <td>${movie.cast_crew}</td>
                                    <td>${movie.rating}</td>
                                </tr>`
                            )
                        });
                    }
                },
                statusCode: {
                    204: function() {
                        $('#tableBody').html('<tr class="text-center" style="height:500px"><td colspan="4" class="text-danger">No Data for this filter</td></tr>');
                        console.log("No Categories Available");
                    }
                },
                error: function(xhr,status,error){
                    console.log(xhr.status,error);
                }
            })
    })
})


// HASCHANGE HANDLER
    // $(window).bind('hashchange', function (event) {
    //     let urlfrag = $.deparam.fragment();
    //     let categories = urlfrag.category
    //     let sortOrder = urlfrag.sort
    //     let ratings = urlfrag.rating
    //     // let categories = typeof $.bbq.getState("category") !== 'undefined' ? $.bbq.getState("category") : [];
    //     // let sortOrder = typeof $.bbq.getState("sort") !== 'undefined' ? $.bbq.getState("sort") : 'asc';
    //     // let ratings = typeof $.bbq.getState("rating") !== 'undefined' ? $.bbq.getState("rating") : [];

    //         $.ajax({
    //             url: 'filter.php',
    //             type: 'GET',
    //             data:{
    //                 sort:sortOrder,
    //                 categories:categories,
    //                 ratings:ratings
    //             },
    //             success: function (response) {
    //                 let data = JSON.parse(response);

    //                 $('#tableBody').html("");
    //                 data.forEach((movie, i) => {
    //                     $('#tableBody').append(`
    //                         <tr>
    //                             <td>${movie.movie_name}</td>
    //                             <td>${movie.categories}</td>
    //                             <td>${movie.cast_crew}</td>
    //                             <td>${movie.rating}</td>
    //                         </tr>`
    //                     )
    //                 });
    //             }
    //         })
        
    // })
    // $(window).trigger("hashchange");

