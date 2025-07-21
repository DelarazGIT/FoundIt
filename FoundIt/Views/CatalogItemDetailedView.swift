//
//  CatologItemDetailedView.swift
//  FoundIt
//
//  Created by Adam Zafir on 5/26/25.
//

import SwiftUI

struct CatalogItemDetailedView: View {
    let item: CatalogItem
    var body: some View {
        item.image
            .resizable()
            .scaledToFit()
            .frame(minHeight: 200)
        Text(item.name)
            .font(.title)
        List {
            Section(header: Text("Found At")) {
                Text(item.found)
            }
            Section(header: Text("Returned To")) {
                Text(item.placedAtNow)
            }
        }
        
        
    }
}

#Preview {
    CatalogItemDetailedView(item: CatalogItem(name: "Example", image: Image("photo1"), placedAtNow: "Go", found: "here"))
}
