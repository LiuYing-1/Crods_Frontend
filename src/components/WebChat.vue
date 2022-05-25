<script>
  window.watsonAssistantChatOptions = {
      integrationID: "979666aa-15c2-4fc7-9a96-10f32f6679dc", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "a07026a4-7a33-4d4b-8adf-61ca8fee5513", // The ID of your service instance.
      onLoad: function(instance) { instance.render(); }
    };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js"
    document.head.appendChild(t);
  });
</script>