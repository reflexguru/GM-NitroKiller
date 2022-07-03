import { createItem, removeItem } from '@goosemod/settings';

let moduleSettings = {
  gift: true,
  banners: true,
  button: true,
  boosts: true,
  tab: true,
  emoji: false,
  category: false
}

export default {
  goosemodHandlers: {
    onImport: () => {},

    onLoadingFinished: () => {
      createItem('Nitro Killer', [
        '1.0.0',
        {
          type: "toggle",
          text: "Hide gift/boost icon in message input box",
          onToggle: value => applySettingChange('gift', value),
          isToggled: () => moduleSettings.gift
        },
        {
          type: "toggle",
          text: "Hide nitro banners and buttons in modals",
          onToggle: value => applySettingChange('banners', value),
          isToggled: () => moduleSettings.banners
        },
        {
          type: "toggle",
          text: "Hide new nitro button in server list",
          onToggle: value => applySettingChange('button', value),
          isToggled: () => moduleSettings.button
        },
        {
          type: "toggle",
          text: "Hide server boosts",
          onToggle: value => applySettingChange('boosts', value),
          isToggled: () => moduleSettings.boosts
        },
        {
          type: "toggle",
          text: "Hide nitro tab in home tab",
          onToggle: value => applySettingChange('tab', value),
          isToggled: () => moduleSettings.tab
        },
        {
          type: "toggle",
          text: "Hide payment-related tabs in settings",
          onToggle: value => applySettingChange('category', value),
          isToggled: () => moduleSettings.category
        },
        /* {
          type: "toggle",
          text: "Hide unavailable emoji (WIP)",
          onToggle: value => applySettingChange('emoji', value),
          isToggled: () => moduleSettings.emoji
        } */
      ]);

      compileAndApplyCss();
    },

    onRemove: () => {
      removeItem('Nitro Killer');
      removeExistingStyle();
    },

    getSettings: () => [moduleSettings],
    loadSettings: ([_settings]) => {
      moduleSettings = _settings || moduleSettings;
    },
  },
};

function applySettingChange(type, value, silent = false) {
  moduleSettings[type] = value;
  if (!silent) compileAndApplyCss();
}

function compileAndApplyCss() {
  let compiledCss = '';

  for (let type of Object.keys(moduleSettings)) {
    if (moduleSettings[type] && styles[type]) {
      compiledCss += styles[type] + ' ';
      console.log('[Nitro Killer] applying ' + type);
    }
  }

  removeExistingStyle();

  const element = document.createElement('style');
  element.id = 'killnitro';
  element.appendChild(document.createTextNode(compiledCss));

  document.head.appendChild(element);

  // remove the inline variants of nitro button
  if (moduleSettings.button) {
    document.querySelector('.circleIconButton-1VxDrg').parentElement.parentElement.parentElement.parentElement.parentElement.style = 'display: none !important';
  } else {
    document.querySelector('.circleIconButton-1VxDrg').parentElement.parentElement.parentElement.parentElement.parentElement.style = 'display: block';
  }
}

function removeExistingStyle() {
  const element = document.head.querySelector('#killnitro');
  if (element) element.remove();
}

const styles = {

  gift: `
.buttons-uaqb-5 > *:not(.expression-picker-chat-input-button) {
  display: none !important;
}
`,

  banners: `
.shinyButton-2Q9MDB, .giftAction-ACtHBA,
div[aria-label="Your files are too powerful"] > div > .content-2hZxGK > .text-md-normal-304U3g > .body-1WcPyw:last-child,
div[aria-label="Your files are too powerful"] > div > .footer-31IekZ,
.perksModalContentWrapper-3RHugb > .content-2O_Vsy > .wrapper-3Zq_cJ,
.upsellBanner-1tVKtW,
.selectorButtonPremiumRequired-IZXhgV,
.premiumPromoDescription-1kf0Oa {
  display: none !important;
}
`,

  tab: `
.channel-1Shao0.container-32HW5s[aria-posinset="2"] {
  display: none !important;
}
`,

  boosts: `
.container-2giAcK,
#guild-header-popout-premium-subscribe,
.scroller-1bVxF5 > .separator-1So4YB:first-child {
  display: none !important;
}
`,

  button: `
.fixedBottomList-1yrBla,
div[data-list-item-id="guildsnav___nitro-subscription-button"],
mask[id="58aa52f8-b8f3-4834-994a-3c1c16dfdfaa"] {
  display: none !important;
}

foreignObject[mask="url(#58aa52f8-b8f3-4834-994a-3c1c16dfdfaa)"] {
  opacity: 0;
  pointer-events: none;
  margin-bottom: -56px;
}
`,

  emoji: `
.emojiItemDisabled-3VVnwp {
  display: none !important;
}  
`,

  category: `
div[aria-controls="discord-nitro-tab"],
div[aria-controls="nitro-server-boost-tab"],
div[aria-controls="subscriptions-tab"],
div[aria-controls="billing-tab"] {
  display: none !important;
}
`

}
