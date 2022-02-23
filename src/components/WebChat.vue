<script>
  window.watsonAssistantChatOptions = {
      integrationID: "44d843c9-b2e2-46c2-8c74-1a6a508df7a9", // The ID of this integration.
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