import {
  DELETE_TAGS_SELECTOR,
  GAMEFAQ_PLATFORM_LINK_SELECTOR,
  GAMEFAQ_PLATFORM_MAPPING,
} from "../constants";
import { APIResponse, Link } from "../types";
import { getWebLinksPayload } from "../utils";

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");

/**
 * Batch add linked groups to a collection
 *
 */
export async function addTorrentsToCollection(
  collectionId: string,
  urls: string[],
): Promise<APIResponse<Record<string, string>>> {
  const response = await fetch("collections.php", {
    method: "POST",
    credentials: "include",
    body: new URLSearchParams({
      action: "add_torrent_batch",
      auth: unsafeWindow["authkey"],
      collageid: collectionId,
      urls: urls.join("\r\n"),
    }),
    headers,
  });

  return await response.json();
}

export async function copyWeblinksToLinkedGroup(
  weblinks: Link[],
  linkedGroup: { title: string; id: string },
) {
  const linkedGroupWeblinksFormData = await getLinkedGroupNonWikiFormData(
    linkedGroup.id,
  );

  const payload = await getWebLinksPayload(
    weblinks,
    linkedGroupWeblinksFormData,
    linkedGroup.title,
  );

  const response = await fetch("/torrents.php", {
    method: "POST",
    credentials: "include",
    body: payload,
    headers,
  });

  return await response.json();
}

/**
 * Get FormData of NonWiki form
 *
 * @param linkedGroupId Group Id
 * @returns A FormData object of the Non-Wiki form
 */
export async function getLinkedGroupNonWikiFormData(
  linkedGroupId: string,
): Promise<FormData> {
  const response = await fetch(
    `https://gazellegames.net/torrents.php?action=editgroup&groupid=${linkedGroupId}`,
  );

  const rawHTML = await response.text();

  const parser = new DOMParser();

  const parsedHTML = parser.parseFromString(rawHTML, "text/html");

  const inputField = parsedHTML.querySelector<HTMLInputElement>(
    "input[value=nonwikiedit]",
  );
  const formElement = inputField?.parentNode as HTMLFormElement | undefined;

  if (!inputField || !formElement) {
    throw new Error("Markup has probably changed. Fix selector.");
  }

  return new FormData(formElement);
}

export async function getLinkedGroupDeletionTagsHref(
  linkedGroupId: string,
): Promise<string[]> {
  const response = await fetch(
    `https://gazellegames.net/torrents.php?id=${linkedGroupId}`,
  );

  const rawHTML = await response.text();

  const parser = new DOMParser();

  const parsedHTML = parser.parseFromString(rawHTML, "text/html");

  const anchorElements =
    parsedHTML.querySelectorAll<HTMLAnchorElement>(DELETE_TAGS_SELECTOR);

  return Array.from(anchorElements).map((anchorElement) => anchorElement.href);
}

export async function getGroupInfo(id: string) {
  try {
    const response = await fetch(
      `https://gazellegames.net/ajax.php?action=torrentgroup&id=${id}`,
    );

    const parsedResponse = await response.json();

    if (parsedResponse.status === "success") {
      return parsedResponse.response;
    }

    throw new Error("Something went wrong!");
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAllTagsInLinkedGroup(linkedGroupId: string) {
  const deletionTagHrefs = await getLinkedGroupDeletionTagsHref(linkedGroupId);

  for (const deletionTagHref of deletionTagHrefs) {
    fetch(deletionTagHref, {
      method: "GET",
      credentials: "include",
      headers,
    });
  }
}

export async function addTagsToLinkedGroup(
  linkedGroupId: string,
  tags: string[],
) {
  const response = await fetch("torrents.php?ajax=1", {
    method: "POST",
    credentials: "include",
    body: new URLSearchParams({
      action: "add_tag",
      groupid: linkedGroupId,
      genre_tags: "adventure",
      tags: tags.join(",+"),
    }),
    headers,
  });

  return await response.json();
}

export async function getGameFaqLinkByPlatform(url: string, platform: string) {
  const response = await fetch(url);

  const rawHTML = await response.text();

  const parser = new DOMParser();

  const parsedHTML = parser.parseFromString(rawHTML, "text/html");

  const anchorElements = parsedHTML.querySelectorAll<HTMLAnchorElement>(
    GAMEFAQ_PLATFORM_LINK_SELECTOR,
  );

  return Array.from(anchorElements)
    .map((anchorElement) => {
      const spanElement = anchorElement.childNodes[0] as HTMLSpanElement;
      return {
        href: anchorElement.href,
        title: spanElement.innerText,
      };
    })
    .find((link) => link.title === GAMEFAQ_PLATFORM_MAPPING[platform])?.href;
}
