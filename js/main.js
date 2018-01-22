$(document).ready(function(){
	sessionStorage.removeItem('currentBookId');
	$('#add-book').on('submit', function(e){
			e.preventDefault();

			var title = $('#title').val();
			var category = $('#category').val();
			var excerpt = $('#excerpt').val();
			
			if(sessionStorage.getItem('currentBookId')!=null){
				
			var id = sessionStorage.getItem('currentBookId') ;
			var url = "https://api.mlab.com/api/1/databases/mlabjquery/collections/books/"+id+"?apiKey=yDcvbH6gqlv3eIkBNKHdkgAwJGfLVuv8"
			var type = "PUT";
			console.log($(this).data('id'))
			}
			else {
			var url = "https://api.mlab.com/api/1/databases/mlabjquery/collections/books?apiKey=yDcvbH6gqlv3eIkBNKHdkgAwJGfLVuv8"		
			var type = "POST";
			}


			$.ajax({
				url : "https://api.mlab.com/api/1/databases/mlabjquery/collections/books?apiKey=yDcvbH6gqlv3eIkBNKHdkgAwJGfLVuv8",
				data:JSON.stringify({
					"title" : title,
					"category" : category,
					"excerpt" : excerpt
			}),
				type : type,
				contentType : "application/json",	
			success: function(data){
				window.location.href = "index.html" ;
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});	
	});
	$('body').on('click','#setBook', function(e){
		e.preventDefault();
		sessionStorage.setItem('currentBookId', $(this).data('id'));
		$('#title').val($(this).data('title'));
		$('#category').val($(this).data('category'));
		$('#excerpt').val($(this).data('excerpt'));
	});

	$('body').on('click','#deleteBook', function(e){
		e.preventDefault();
		var id = $(this).data('id');
		var url = "https://api.mlab.com/api/1/databases/mlabjquery/collections/books/"+id+"?apiKey=yDcvbH6gqlv3eIkBNKHdkgAwJGfLVuv8"

		$.ajax({
				url :url,
				type : 'DELETE',
				async: true,
				timeout : 3000,
				
			success: function(data){
				window.location.href = "index.html" ;
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});		

	});
});

function getBooks(){
	$.ajax({
		url:"https://api.mlab.com/api/1/databases/mlabjquery/collections/books?apiKey=yDcvbH6gqlv3eIkBNKHdkgAwJGfLVuv8"
	}).done(function(data){
		var output = '<div>';
		$.each(data, function(key,data){
			output +='<div class="well">';
			output +='<h3>'+data.title+'</h3>';
			output +='<p> category :' +data.category+'</p>';
			output += '<p>' + data.excerpt +'</p>';
			output +='<a id ="setBook" href="" data-id="'+data._id.$oid+'" data-title="'+data.title+'" data-category = "'+data.category+'"  data-excerpt = "'+data.excerpt+'">Edit</a>|<a href="" id ="deleteBook" data-id="'+data._id.$oid+'">Delete</a>' 
			output +='</div>'
		});
		output +='</div>' ;
		$('#books').html(output);
	});
}	