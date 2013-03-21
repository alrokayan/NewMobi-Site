elixirQuery(document).ready(function(){
	elixirQuery('form').wrap('<div class="envelopeForm" />');
	elixirQuery('.envelopeForm').prepend('<div class="envelopeStamp"></div>');
});