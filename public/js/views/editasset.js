window.EditAssetView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteAsset",
        "click .cancel" : "cancel",
        "drop #picture" : "dropHandler"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },

    beforeSave: function () {
        var self = this;
        this.saveAsset();
        return false;
    },

    saveAsset: function () {
        var self = this;        
        console.log('before save');
        self.model.save(null, {
            success: function (model) {                
                self.render();
                app.navigate('assets', true);
                utils.showAlert('Success!', 'Asset saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deleteAsset: function () {
        this.model.destroy({
            success: function () {
                app.navigate('assets', true);
            }
        });
        return false;
    },
    
    cancel: function () {
        app.navigate('assets', true);
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];
        this.model.readFile(this.pictureFile);
    }

});