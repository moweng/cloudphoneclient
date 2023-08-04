class DataChannelManager {
  private dataChannelMap: Map<string, RTCDataChannel> = new Map();
  
  addDataChannel(channelId = 'default', channel: RTCDataChannel) {
    var that = this;
    channel.onopen = function () {
      that.emit('data_channel_opened', channel, channelId);
    };

    channel.onclose = function (event) {
      this.dataChannelMap.delete(channelId)
      that.emit('data_channel_closed', channel, channelId);
    };

    channel.onmessage = function (message) {
        var json;
        json = JSON.parse(message.data);
        console.log('dataSchannel receive', message.data);
        if (json.type === '__file') {
            /*that.receiveFileChunk(json);*/
            that.parseFilePacket(json, channelId);
        } else {
            that.emit('data_channel_message', channel, channelId, json.data);
        }
    };

    channel.onerror = function (err) {
        that.emit('data_channel_error', channel, channelId, err);
    };
    this.dataChannelMap.set(channelId, channel);
    return channel;
  }
}