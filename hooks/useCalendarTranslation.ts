import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

/**
 * A voir comment on peut faire autreemnt
 */
export const useCalendarTranslation = () => {
  const { i18n } = useLingui();

  return {
    today: i18n._(
      t({
        id: "UTILS-Today",
        comment: "today label",
      })
    ),
    monthNames: [
      i18n._(
        t({
          id: "UTILS-January",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-February",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-March",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-April",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-May",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-June",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-July",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-August",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-September",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-October",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-November",
          comment: "full month name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-December",
          comment: "full month name",
        })
      ),
    ],
    dayNames: [
      i18n._(
        t({
          id: "UTILS-Sunday",
          comment: "full day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Monday",
          comment: "full day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Tuesday",
          comment: "full day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Wednesday",
          comment: "full day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Thursday",
          comment: "full day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Friday",
          comment: "full day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Saturday",
          comment: "full day name",
        })
      ),
    ],
    dayNamesShort: [
      i18n._(
        t({
          id: "UTILS-Su",
          comment: "abbreviated day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Mo",
          comment: "abbreviated day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Tu",
          comment: "abbreviated day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-We",
          comment: "abbreviated day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Th",
          comment: "abbreviated day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Fr",
          comment: "abbreviated day name",
        })
      ),
      i18n._(
        t({
          id: "UTILS-Sa",
          comment: "abbreviated day name",
        })
      ),
    ],
  };
};
