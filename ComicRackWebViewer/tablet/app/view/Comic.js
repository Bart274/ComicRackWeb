/*
  This file is part of Badaap Comic Reader.

  Copyright (c) 2012 Jeroen Walter

  Badaap Comic Reader is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Badaap Comic Reader is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Badaap Comic Reader.  If not, see <http://www.gnu.org/licenses/>.
*/

var SLIDER_RANGE = 10000;

Ext.define('Comic.view.Comic', {
  extend: 'Ext.Container',
  xtype: 'comicview',
  requires: [
        'Comic.view.ImageViewer',
        'Ext.field.Slider'
  ],
  config: {
    layout: 'fit',
    items: [
      {
        xtype: 'titlebar',
        itemId: 'comictitle',
        docked: 'top',
        style: 'opacity: 0.8;',
        top: '0px',
        width: '100%',
        title: 'Comic',
        items: [
          {
            //iconCls: 'home',
            //iconMask: true,
            align: 'left',
            itemId: 'backbutton',
            ui: "back",
            text: 'Back'
          },
          {
            xtype: 'button',
            align: 'right',
            itemId: 'settingsbutton',
            //icon: 'resources/images/settings.png',
            iconCls: 'settings',
            iconMask: true
          }
        ]
      },
      {
        xtype: 'container',
        itemId: 'imageviewercontainer',
        layout: 'fit',
        items: [
        {
          xtype: 'imageviewer',
          itemId: 'imageviewer',
          style: {
            backgroundColor: '#000'
          },
          imageSrc: 'resources/images/no_image_available.jpg'
        }]
      },
      {
        xtype: 'toolbar',
        docked: 'bottom',
        style: 'opacity: 0.8;',
        bottom: '0px',
        width: '100%',
        height: 75,
        items: [
          {
            xtype: 'sliderfield',
            itemId: 'slider',
            minValue: 0,
            maxValue: SLIDER_RANGE,
            //width: '50%',
            flex: 1
          },
          {
            xtype: 'button',
            itemId: 'progressbutton'
          },
          {
            xtype: 'button',
            itemId: 'infobutton',
            //icon: 'resources/images/info.png',
            iconCls: 'info',
            iconMask: true
          },

          {
            xtype: 'button',
            //icon: 'resources/images/arrow_left.png',
            itemId: 'previousbutton',
            iconCls: 'arrow_left',
            iconMask: true
          },
          {
            xtype: 'button',
            //icon: 'resources/images/arrow_right.png',
            itemId: 'nextbutton',
            iconCls: 'arrow_right',
            iconMask: true
          }
        ]
      },
      {
        xtype: 'image',
        itemId: 'prevPageIcon',
        left: '10px',
        top: '50%',
        //src: 'resources/images/previous-page.png',
        src: 'data:image/png;base64,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',
        width: 64,
        height: 64,
        hidden: true
      },
      {
        xtype: 'image',
        itemId: 'nextPageIcon',
        right: '10px',
        top: '50%',
        //src: 'resources/images/next-page.png',
        src: 'data:image/png;base64,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',
        width: 64,
        height: 64,
        hidden: true
      },
      {
        xtype: 'image',
        itemId: 'loadingIndicator',
        left: '10px',
        top: '60px',
        //src: 'resources/images/loading.gif',
        src: 'data:image/gif;base64,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',
        width: 64,
        height: 64,
        hidden: true
      }
    ]
  }
});